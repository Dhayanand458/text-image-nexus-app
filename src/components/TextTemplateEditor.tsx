
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Template } from '@/types';

interface TextTemplateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template;
  onUpdateTemplate: (updates: Partial<Template>) => void;
}

const TextTemplateEditor: React.FC<TextTemplateEditorProps> = ({
  isOpen,
  onClose,
  template,
  onUpdateTemplate
}) => {
  const [newText, setNewText] = useState('');
  const [textEntries, setTextEntries] = useState(template.texts);

  const handleAddText = () => {
    if (newText.trim()) {
      const updatedTexts = [...textEntries, newText.trim()];
      setTextEntries(updatedTexts);
      onUpdateTemplate({ texts: updatedTexts });
      setNewText('');
    }
  };

  const handleDeleteText = (index: number) => {
    const updatedTexts = textEntries.filter((_, i) => i !== index);
    setTextEntries(updatedTexts);
    onUpdateTemplate({ 
      texts: updatedTexts,
      currentTextIndex: Math.min(template.currentTextIndex, updatedTexts.length - 1)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Template #{template.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <Button onClick={() => setNewText('')} className="w-full bg-blue-600 hover:bg-blue-700">
            Add Text
          </Button>

          <div className="space-y-2">
            <Input
              placeholder="Enter text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddText()}
            />
            <Button onClick={handleAddText} size="sm">
              Done
            </Button>
          </div>

          {textEntries.map((text, index) => (
            <div key={index} className="flex items-center gap-2 p-2 border rounded">
              <span className="text-sm font-mono">#{index + 1}</span>
              <span className="flex-1">{text}</span>
              <Button
                onClick={() => handleDeleteText(index)}
                variant="destructive"
                size="sm"
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TextTemplateEditor;
