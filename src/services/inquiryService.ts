import { collection, addDoc, serverTimestamp, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Inquiry {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  destination: string;
  travelDates: string;
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
