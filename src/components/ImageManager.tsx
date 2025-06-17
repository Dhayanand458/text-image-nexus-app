
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ImageUpload from './ImageUpload';
import ImageDisplay from './ImageDisplay';

interface ImageManagerProps {
  images: string[];
  onAddImage: (base64: string) => void;
  onDeleteImage: (index: number) => void;
}

const ImageManager: React.FC<ImageManagerProps> = ({ images, onAddImage, onDeleteImage }) => {
  const [selectedUpload, setSelectedUpload] = useState<number | null>(null);
  const [uploadAreas, setUploadAreas] = useState<number[]>([0]);

  const handleImageAdd = (base64: string, uploadIndex: number) => {
    onAddImage(base64);
    // Add new upload area
    setUploadAreas(prev => [...prev, Math.max(...prev) + 1]);
    setSelectedUpload(null);
  };

  return (
    <div className="space-y-6">
      <Button 
        onClick={() => setUploadAreas(prev => [...prev, Math.max(...prev) + 1])}
        className="bg-green-600 hover:bg-green-700"
      >
        Add Image
      </Button>

      {uploadAreas.map((areaId, index) => (
        <div key={areaId} className="space-y-4">
          <ImageUpload
            onImageAdd={(base64) => handleImageAdd(base64, areaId)}
            isSelected={selectedUpload === areaId}
            onSelect={() => setSelectedUpload(areaId)}
          />
        </div>
      ))}

      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Uploaded Images</h3>
          {images.map((image, index) => (
            <ImageDisplay
              key={index}
              base64={image}
              onDelete={() => onDeleteImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageManager;
