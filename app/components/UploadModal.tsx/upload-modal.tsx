// components/UploadModal.tsx
"use client"; // Add this at the top

import { UploadDropzone } from "@/utils/uploadthing";

interface UploadModalProps {
  type: 'Update' | 'Create';
  title: string;
  content: string;
  onUploadComplete: () => void;
}

export const UploadModal = ({ 
  type = 'Create',
  title,
  content,
  onUploadComplete 
}: UploadModalProps) => {
  return (
    <div className="space-y-3 w-full">
      <label className="text-lg font-medium">Featured Image</label>
      <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-purple-200 transition-colors group relative">
        <UploadDropzone
          endpoint="imageUploader"
          input={{ title, content }}
          onClientUploadComplete={onUploadComplete}
          appearance={{
            button: "ut-ready:bg-purple-600 ut-uploading:cursor-not-allowed",
            container: "w-full"
          }}
        />
      </div>
    </div>
  );
};