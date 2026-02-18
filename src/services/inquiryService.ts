import { collection, addDoc, serverTimestamp, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
  createdAt: any;
  status: 'new' | 'contacted' | 'resolved';
}

const INQUIRIES_COLLECTION = "inquiries";

export const saveInquiry = async (data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
  try {
    const docRef = await addDoc(collection(db, INQUIRIES_COLLECTION), {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving inquiry:", error);
    return { success: false, error };
  }
};

export const getInquiries = async () => {
  try {
    const q = query(collection(db, INQUIRIES_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Inquiry[];
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return [];
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
