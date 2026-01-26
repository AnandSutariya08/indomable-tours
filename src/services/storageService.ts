import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

export const uploadImage = async (
  file: File,
  folder: string
): Promise<string | null> => {
  try {
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const path = `${folder}/${timestamp}_${sanitizedName}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const deleteImage = async (path: string): Promise<boolean> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
};

export const getImagePath = (folder: string, fileName: string): string => {
  const timestamp = Date.now();
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.]/g, "_");
  return `${folder}/${timestamp}_${sanitizedName}`;
};
