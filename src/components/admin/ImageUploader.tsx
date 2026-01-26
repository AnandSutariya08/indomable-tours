import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/services/storageService";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  label?: string;
}

export function ImageUploader({ value, onChange, folder, label }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      if (url) {
        onChange(url);
        toast({ title: "Image uploaded successfully" });
      } else {
        toast({ title: "Failed to upload image", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error uploading image", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-24 h-24 rounded-lg border-2 border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground mt-1">Upload</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        )}
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or enter image URL"
            className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>
    </div>
  );
}
