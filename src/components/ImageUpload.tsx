
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImageUploadProps {
  onImageAdd: (base64: string) => void;
  isSelected: boolean;
  onSelect: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageAdd, isSelected, onSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        onImageAdd(base64);
        toast.success('Image added successfully');
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) handleFileSelect(file);
        break;
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed p-8 rounded-lg cursor-pointer transition-all ${
        isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      } ${isSelected ? 'border-blue-500 bg-blue-50' : ''}`}
      onClick={onSelect}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onPaste={handlePaste}
      tabIndex={0}
    >
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          {isSelected 
            ? "Now you can paste an image or click upload button below" 
            : "Image - Click to select, then paste or upload"
          }
        </p>
        {isSelected && (
          <Button onClick={handleUploadClick} className="bg-blue-600 hover:bg-blue-700">
            Click to upload
          </Button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
