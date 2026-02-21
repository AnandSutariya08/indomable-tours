import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const asRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : {};

export const getCollection = async <T>(collectionName: string): Promise<T[]> => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((item) => ({
      id: item.id,
      ...asRecord(item.data()),
    })) as T[];
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
};

export const getDocument = async <T>(
  collectionName: string,
  docId: string,
): Promise<T | null> => {
  try {
    const snapshot = await getDoc(doc(db, collectionName, docId));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...asRecord(snapshot.data()) } as T;
  } catch (error) {
    console.error(`Error fetching ${collectionName}/${docId}:`, error);
    return null;
  }
};

export const addDocument = async (
  collectionName: string,
  data: Record<string, unknown>,
): Promise<string | null> => {
  try {
    const ref = await addDoc(collection(db, collectionName), data);
    return ref.id;
  } catch (error) {
    console.error(`Error adding to ${collectionName}:`, error);
    return null;
  }
};

export const setDocument = async (
  collectionName: string,
  docId: string,
  data: Record<string, unknown>,
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
  data: Record<string, unknown>,
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
  docId: string,
): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (error) {
    console.error(`Error deleting ${collectionName}/${docId}:`, error);
    return false;
  }
};

export const COLLECTIONS = {
  TOURS: "tours",
  DESTINATIONS: "destinations",
  BLOG_POSTS: "blogPosts",
  CITIES: "cities",
  TESTIMONIALS: "testimonials",
  INQUIRIES: "inquiries",
  TRAVEL_INFO: "travelInfo",
  EXPLORE_DESTINATIONS: "exploreDestinations",
  EXPLORE_TOURS: "exploreTours",
  TEAM: "team",
} as const;
