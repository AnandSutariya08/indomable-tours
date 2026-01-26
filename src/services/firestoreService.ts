import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  setDoc
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Generic CRUD operations
export const getCollection = async <T>(collectionName: string): Promise<T[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
};

export const getDocument = async <T>(collectionName: string, docId: string): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${collectionName}/${docId}:`, error);
    return null;
  }
};

export const addDocument = async (
  collectionName: string, 
  data: Record<string, unknown>
): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding to ${collectionName}:`, error);
    return null;
  }
};

export const setDocument = async (
  collectionName: string,
  docId: string,
  data: Record<string, unknown>
): Promise<boolean> => {
  try {
    await setDoc(doc(db, collectionName, docId), data);
    return true;
  } catch (error) {
    console.error(`Error setting ${collectionName}/${docId}:`, error);
    return false;
  }
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: Record<string, unknown>
): Promise<boolean> => {
  try {
    await updateDoc(doc(db, collectionName, docId), data);
    return true;
  } catch (error) {
    console.error(`Error updating ${collectionName}/${docId}:`, error);
    return false;
  }
};

export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (error) {
    console.error(`Error deleting ${collectionName}/${docId}:`, error);
    return false;
  }
};

// Collection names
export const COLLECTIONS = {
  TOURS: "tours",
  DESTINATIONS: "destinations",
  BLOG_POSTS: "blogPosts",
  CITIES: "cities",
  TESTIMONIALS: "testimonials",
  TRAVEL_INFO: "travelInfo",
  EXPLORE_DESTINATIONS: "exploreDestinations",
  EXPLORE_TOURS: "exploreTours",
  TEAM: "team",
} as const;
