
import React from 'react';
import { Button } from '@/components/ui/button';

interface ImageDisplayProps {
  base64: string;
  onDelete: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ base64, onDelete }) => {
  return (
    <div className="relative group">
      <img 
        src={base64} 
        alt="Uploaded" 
        className="max-w-full h-auto rounded-lg shadow-md"
      />
      <Button
        onClick={onDelete}
        variant="destructive"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Delete
      </Button>
    </div>
  );
};

export default ImageDisplay;
