
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageManager from './ImageManager';

interface ImagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  onAddImage: (base64: string) => void;
  onDeleteImage: (index: number) => void;
  title: string;
}

const ImagePopup: React.FC<ImagePopupProps> = ({
  isOpen,
  onClose,
  images,
  onAddImage,
  onDeleteImage,
  title
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ImageManager
          images={images}
          onAddImage={onAddImage}
          onDeleteImage={onDeleteImage}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImagePopup;
