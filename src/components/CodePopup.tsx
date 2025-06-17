
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CodePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  title: string;
}

const CodePopup: React.FC<CodePopupProps> = ({ isOpen, onClose, onSubmit, title }) => {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    if (code.trim()) {
      onSubmit(code.trim());
      setCode('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter code (e.g., F78j87I)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button onClick={handleSubmit} className="w-full">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodePopup;
