import { useState } from "react";
import { Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { setDocument, COLLECTIONS } from "@/services/firestoreService";
import { uploadImage } from "@/services/storageService";

// Import seed data
import toursData from "@/data/seed/tours.json";
import destinationsData from "@/data/seed/destinations.json";
import blogPostsData from "@/data/seed/blogPosts.json";
import citiesData from "@/data/seed/cities.json";
import testimonialsData from "@/data/seed/testimonials.json";
import travelInfoData from "@/data/seed/travelInfo.json";
import exploreDestinationsData from "@/data/seed/exploreDestinations.json";
import exploreToursData from "@/data/seed/exploreTours.json";
import teamData from "@/data/seed/team.json";

// Import images
import bhutanImg from "@/assets/destinations/bhutan.jpg";
import jaipurImg from "@/assets/destinations/jaipur.jpg";
import keralaImg from "@/assets/destinations/kerala.jpg";
import lehLadakhImg from "@/assets/destinations/leh-ladakh.jpg";
import nepalImg from "@/assets/destinations/nepal.jpg";
import srilankaImg from "@/assets/destinations/srilanka.jpg";
import tajMahalImg from "@/assets/destinations/taj-mahal.jpg";
import varanasiImg from "@/assets/destinations/varanasi.jpg";
import blog1Img from "@/assets/blog/blog-1.jpg";
import blog2Img from "@/assets/blog/blog-2.jpg";
import blog3Img from "@/assets/blog/blog-3.jpg";
import luxuryHeroImg from "@/assets/luxury-hero.jpg";

// Image mapping
const imageMap: Record<string, string> = {
  "/src/assets/destinations/bhutan.jpg": bhutanImg,
  "/src/assets/destinations/jaipur.jpg": jaipurImg,
  "/src/assets/destinations/kerala.jpg": keralaImg,
  "/src/assets/destinations/leh-ladakh.jpg": lehLadakhImg,
  "/src/assets/destinations/nepal.jpg": nepalImg,
  "/src/assets/destinations/srilanka.jpg": srilankaImg,
  "/src/assets/destinations/taj-mahal.jpg": tajMahalImg,
  "/src/assets/destinations/varanasi.jpg": varanasiImg,
  "/src/assets/blog/blog-1.jpg": blog1Img,
  "/src/assets/blog/blog-2.jpg": blog2Img,
  "/src/assets/blog/blog-3.jpg": blog3Img,
  "/src/assets/luxury-hero.jpg": luxuryHeroImg,
};

interface UploadStatus {
  collection: string;
  status: "pending" | "uploading" | "success" | "error";
  message?: string;
}

const AdminSeedUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statuses, setStatuses] = useState<UploadStatus[]>([]);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const updateStatus = (collection: string, status: UploadStatus["status"], message?: string) => {
    setStatuses(prev => {
      const existing = prev.find(s => s.collection === collection);
      if (existing) {
        return prev.map(s => s.collection === collection ? { ...s, status, message } : s);
      }
      return [...prev, { collection, status, message }];
    });
  };

  const uploadImageToStorage = async (localPath: string, folder: string): Promise<string> => {
    // Check if already uploaded
    if (uploadedImages[localPath]) {
      return uploadedImages[localPath];
    }

    const importedImage = imageMap[localPath];
    if (!importedImage) {
      console.warn(`Image not found in map: ${localPath}`);
      return localPath; // Return original path if not in map
    }

    try {
      // Fetch the image and convert to blob
      const response = await fetch(importedImage);
      const blob = await response.blob();
      
      // Create a file from the blob
      const fileName = localPath.split('/').pop() || 'image.jpg';
      const file = new File([blob], fileName, { type: blob.type });
      
      // Upload to Firebase Storage
      const url = await uploadImage(file, folder);
      
      if (url) {
        setUploadedImages(prev => ({ ...prev, [localPath]: url }));
        return url;
      }
      return localPath;
    } catch (error) {
      console.error(`Failed to upload image ${localPath}:`, error);
      return localPath;
    }
  };

  const processImageInObject = async <T extends Record<string, unknown>>(
    obj: T, 
    imageFields: string[], 
    folder: string
  ): Promise<T> => {
    const result = { ...obj };
    
    for (const field of imageFields) {
      if (result[field] && typeof result[field] === "string") {
        const originalPath = result[field] as string;
        if (originalPath.startsWith("/src/assets/")) {
          (result as Record<string, unknown>)[field] = await uploadImageToStorage(originalPath, folder);
        }
      }
    }
    
    return result;
  };

  const uploadCollection = async <T extends { id?: string }>(
    collectionName: string,
    data: T[],
    imageFields: string[] = [],
    imageFolder: string = ""
  ) => {
    updateStatus(collectionName, "uploading");
    
    try {
      for (const item of data) {
        let processedItem = { ...item };
        
        // Process images if needed
        if (imageFields.length > 0 && imageFolder) {
          processedItem = await processImageInObject(
            processedItem as Record<string, unknown>, 
            imageFields, 
            imageFolder
          ) as T;
        }
        
        const { id, ...dataWithoutId } = processedItem;
        const docId = id || `${collectionName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        await setDocument(collectionName, docId, dataWithoutId as Record<string, unknown>);
      }
      
      updateStatus(collectionName, "success", `${data.length} items uploaded`);
    } catch (error) {
      updateStatus(collectionName, "error", (error as Error).message);
      throw error;
    }
  };

  const handleSeedUpload = async () => {
    setIsUploading(true);
    setProgress(0);
    setStatuses([]);
    setUploadedImages({});

    const collections = [
      { name: COLLECTIONS.TOURS, data: toursData, imageFields: ["image"], folder: "tours" },
      { name: COLLECTIONS.DESTINATIONS, data: destinationsData, imageFields: ["image"], folder: "destinations" },
      { name: COLLECTIONS.BLOG_POSTS, data: blogPostsData, imageFields: ["image"], folder: "blog" },
      { name: COLLECTIONS.CITIES, data: citiesData, imageFields: ["image"], folder: "cities" },
      { name: COLLECTIONS.TESTIMONIALS, data: testimonialsData, imageFields: ["avatar"], folder: "testimonials" },
      { name: COLLECTIONS.EXPLORE_DESTINATIONS, data: exploreDestinationsData, imageFields: ["image"], folder: "explore-destinations" },
      { name: COLLECTIONS.EXPLORE_TOURS, data: exploreToursData, imageFields: ["image"], folder: "explore-tours" },
      { name: COLLECTIONS.TEAM, data: teamData, imageFields: ["image"], folder: "team" },
      { name: "travelEssentials", data: travelInfoData.essentials, imageFields: [], folder: "" },
      { name: "faqs", data: travelInfoData.faqs, imageFields: [], folder: "" },
    ];

    try {
      for (let i = 0; i < collections.length; i++) {
        const { name, data, imageFields, folder } = collections[i];
        await uploadCollection(name, data as { id?: string }[], imageFields, folder);
        setProgress(((i + 1) / collections.length) * 100);
      }

      toast({
        title: "Seed data uploaded successfully!",
        description: "All collections have been populated with data.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusIcon = (status: UploadStatus["status"]) => {
    switch (status) {
      case "uploading":
        return <Loader2 className="w-4 h-4 animate-spin text-primary" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-muted" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-heading text-primary">Seed Data Uploader</h1>
            <p className="text-muted-foreground">
              Upload all seed data to Firestore with images stored in Firebase Storage
            </p>
          </div>
          <Button onClick={handleSeedUpload} disabled={isUploading} size="lg">
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload All Seed Data
              </>
            )}
          </Button>
        </div>

        {isUploading && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Progress</CardTitle>
              <CardDescription>Uploading images and data to Firebase</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
            </CardContent>
          </Card>
        )}

        {statuses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {statuses.map((status) => (
                  <div key={status.collection} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(status.status)}
                      <span className="font-medium capitalize">{status.collection}</span>
                    </div>
                    {status.message && (
                      <span className="text-sm text-muted-foreground">{status.message}</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>What will be uploaded</CardTitle>
            <CardDescription>The following collections will be populated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "Tours", count: toursData.length },
                { name: "Destinations", count: destinationsData.length },
                { name: "Blog Posts", count: blogPostsData.length },
                { name: "Cities", count: citiesData.length },
                { name: "Testimonials", count: testimonialsData.length },
                { name: "Explore Destinations", count: exploreDestinationsData.length },
                { name: "Explore Tours", count: exploreToursData.length },
                { name: "Team", count: teamData.length },
                { name: "Travel Essentials", count: travelInfoData.essentials.length },
                { name: "FAQs", count: travelInfoData.faqs.length },
              ].map((item) => (
                <div key={item.name} className="p-4 border rounded-lg text-center">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-2xl font-bold text-primary">{item.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSeedUploader;
