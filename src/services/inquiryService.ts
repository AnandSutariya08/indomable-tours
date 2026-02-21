import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/services/firestoreService";

export type InquiryStatus = "new" | "contacted" | "resolved";

export interface Inquiry {
  id?: string;
  category: string;
  companyName?: string;
  fullName: string;
  email: string;
  phone?: string;
  destination: string;
  travelDates: string;
  travelTime?: string;
  message: string;
  createdAt: string;
  status: InquiryStatus;
}

const INQUIRIES_STORAGE_KEY = "indomaple_inquiries";

const readInquiries = (): Inquiry[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
  } catch {
    return [];
  }
};

const writeInquiries = (items: Inquiry[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(items));
};

const asString = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback;

const normalizeCreatedAt = (value: unknown): string => {
  if (typeof value === "string" && value.trim().length > 0) return value;
  if (typeof value === "number") return new Date(value).toISOString();
  if (
    value &&
    typeof value === "object" &&
    "toDate" in (value as Record<string, unknown>) &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  ) {
    const date = (value as { toDate: () => Date }).toDate();
    return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  }
  return new Date().toISOString();
};

const normalizeStatus = (value: unknown): InquiryStatus => {
  if (value === "new" || value === "contacted" || value === "resolved") return value;
  return "new";
};

const normalizeInquiry = (raw: Record<string, unknown>, id?: string): Inquiry => ({
  id: asString(raw.id, id ?? ""),
  category: asString(raw.category, "Individual"),
  companyName: asString(raw.companyName),
  fullName: asString(raw.fullName),
  email: asString(raw.email),
  phone: asString(raw.phone),
  destination: asString(raw.destination),
  travelDates: asString(raw.travelDates),
  travelTime: asString(raw.travelTime),
  message: asString(raw.message),
  createdAt: normalizeCreatedAt(raw.createdAt),
  status: normalizeStatus(raw.status),
});

export const saveInquiry = async (
  data: Omit<Inquiry, "id" | "createdAt" | "status">
) => {
  const inquiry: Inquiry = {
    id: "",
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  try {
    const { id: _id, ...payload } = inquiry;
    const ref = await addDoc(collection(db, COLLECTIONS.INQUIRIES), payload);
    return { success: true, id: ref.id };
  } catch (error) {
    try {
      const fallbackInquiry: Inquiry = {
        ...inquiry,
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      };
      const existing = readInquiries();
      writeInquiries([fallbackInquiry, ...existing]);
      return { success: true, id: fallbackInquiry.id };
    } catch (fallbackError) {
      console.error("Error saving inquiry:", error, fallbackError);
      return { success: false, error: fallbackError };
    }
  }
};

export const getInquiries = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTIONS.INQUIRIES));
    const remote = snapshot.docs.map((item) =>
      normalizeInquiry({ id: item.id, ...(item.data() as Record<string, unknown>) }, item.id)
    );

    if (remote.length > 0) {
      return remote.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return readInquiries().sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return readInquiries().sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
};

export const updateInquiryStatus = async (
  id: string,
  status: InquiryStatus
) => {
  try {
    await updateDoc(doc(db, COLLECTIONS.INQUIRIES, id), { status });
    return { success: true };
  } catch (error) {
    try {
      const existing = readInquiries();
      const updated = existing.map((item) =>
        item.id === id ? { ...item, status } : item
      );
      writeInquiries(updated);
      return { success: true };
    } catch (fallbackError) {
      console.error("Error updating inquiry status:", error, fallbackError);
      return { success: false, error: fallbackError };
    }
  }
};

export const deleteInquiry = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.INQUIRIES, id));
    return { success: true };
  } catch (error) {
    try {
      const existing = readInquiries();
      writeInquiries(existing.filter((item) => item.id !== id));
      return { success: true };
    } catch (fallbackError) {
      console.error("Error deleting inquiry:", error, fallbackError);
      return { success: false, error: fallbackError };
    }
  }
};

export const sendEmailNotification = async (data: any, type: 'inquiry' | 'subscription') => {
  const API_URL = "https://marketingsugandha.vercel.app/api/send-contact";
  const recipient = "gagan.makkar@indomapletours.ca";
  
  let subject = "";
  let html = "";

  if (type === 'subscription') {
    subject = "🚀 New Newsletter Subscription - IndoMaple Tours";
    html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>New Subscription</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background-color:#002147;padding:40px;text-align:center;">
                    <h1 style="color:#ffffff;margin:0;font-size:28px;">New Subscription</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px;color:#333333;line-height:1.6;">
                    <p style="font-size:18px;margin-bottom:20px;">Hello Gagan,</p>
                    <p style="font-size:16px;margin-bottom:20px;">You have a new newsletter subscriber from IndoMaple Tours:</p>
                    <div style="background-color:#f9f9f9;padding:20px;border-radius:6px;margin-bottom:20px;">
                      <p style="margin:5px 0;"><strong>Email:</strong> ${data.email}</p>
                    </div>
                    <p style="font-size:14px;color:#777777;">This email was sent automatically from your website.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  } else {
    subject = `🚀 New Inquiry: ${data.fullName} - ${data.category}`;
    html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>New Inquiry</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background-color:#002147;padding:40px;text-align:center;">
                    <h1 style="color:#ffffff;margin:0;font-size:28px;">New Trip Inquiry</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px;color:#333333;line-height:1.6;">
                    <p style="font-size:18px;margin-bottom:20px;">Hello Gagan,</p>
                    <p style="font-size:16px;margin-bottom:20px;">You have received a new inquiry from IndoMaple Tours:</p>
                    <div style="background-color:#f9f9f9;padding:20px;border-radius:6px;margin-bottom:20px;">
                      <p style="margin:5px 0;"><strong>Name:</strong> ${data.fullName}</p>
                      <p style="margin:5px 0;"><strong>Email:</strong> ${data.email}</p>
                      <p style="margin:5px 0;"><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                      <p style="margin:5px 0;"><strong>Category:</strong> ${data.category}</p>
                      <p style="margin:5px 0;"><strong>Company:</strong> ${data.companyName || 'N/A'}</p>
                      <p style="margin:5px 0;"><strong>Destination:</strong> ${data.destination}</p>
                      <p style="margin:5px 0;"><strong>Preferred Dates:</strong> ${data.travelDates || 'N/A'}</p>
                      <p style="margin:5px 0;"><strong>Preferred Time:</strong> ${data.travelTime || 'N/A'}</p>
                      <p style="margin:5px 0;"><strong>Message:</strong></p>
                      <p style="margin:5px 0;white-space:pre-wrap;">${data.message}</p>
                    </div>
                    <p style="font-size:14px;color:#777777;">This inquiry has also been saved to your Admin Panel.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: recipient,
        subject: subject,
        html: html
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error sending email notification:", error);
    return false;
  }
};
