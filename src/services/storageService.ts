import { ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

const toDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export const uploadImage = async (
  file: File,
  folder: string
): Promise<string | null> => {
  try {
    const dataUrl = await toDataUrl(file);
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    
    await uploadString(storageRef, dataUrl, 'data_url');
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const deleteImage = async (path: string): Promise<boolean> => {
  try {
    if (!path || !path.includes("firebasestorage.googleapis.com")) return true;
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
