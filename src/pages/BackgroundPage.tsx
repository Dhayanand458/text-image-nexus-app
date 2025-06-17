
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useProject } from '@/hooks/useProject';
import { Template } from '@/types';
import TextTemplateEditor from '@/components/TextTemplateEditor';
import ImagePopup from '@/components/ImagePopup';

interface BackgroundPageProps {
  code: string;
}

const BackgroundPage: React.FC<BackgroundPageProps> = ({ code }) => {
  const navigate = useNavigate();
  const { project, addTemplate, updateTemplate, deleteTemplate } = useProject(code);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [imagePopupTemplate, setImagePopupTemplate] = useState<Template | null>(null);

  if (!project) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const handlePrevious = (template: Template) => {
    if (template.currentTextIndex > 0) {
      updateTemplate(template.id, { currentTextIndex: template.currentTextIndex - 1 });
    }
  };

  const handleNext = (template: Template) => {
    if (template.currentTextIndex < template.texts.length - 1) {
      updateTemplate(template.id, { currentTextIndex: template.currentTextIndex + 1 });
    }
  };

  const handleTextClick = (template: Template) => {
    setImagePopupTemplate(template);
  };

  const handleAddImageToTemplate = (template: Template, base64: string) => {
    const newImages = [...template.associatedImages, base64];
    updateTemplate(template.id, { associatedImages: newImages });
  };

  const handleDeleteImageFromTemplate = (template: Template, index: number) => {
    const newImages = template.associatedImages.filter((_, i) => i !== index);
    updateTemplate(template.id, { associatedImages: newImages });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Background Page</h1>
            <Button 
              onClick={() => navigate('/main-image')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Back to Images
            </Button>
          </div>

          <div className="space-y-6">
            <Button 
              onClick={addTemplate}
              className="bg-green-600 hover:bg-green-700 text-4xl w-16 h-16 rounded-full"
            >
              +
            </Button>

            {project.templates.map((template) => (
              <div key={template.id} className="border rounded-lg p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-lg">#{template.id}</span>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditingTemplate(template)}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteTemplate(template.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {template.texts.length > 0 && (
                  <div className="space-y-4">
                    <div 
                      className="p-4 bg-white rounded border cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => handleTextClick(template)}
                    >
                      <p className="text-gray-800">
                        {template.texts[template.currentTextIndex] || 'No text selected'}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        onClick={() => handlePrevious(template)}
                        disabled={template.currentTextIndex === 0}
                        variant="outline"
                        size="sm"
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-gray-600">
                        {template.currentTextIndex + 1} of {template.texts.length}
                      </span>
                      <Button
                        onClick={() => handleNext(template)}
                        disabled={template.currentTextIndex >= template.texts.length - 1}
                        variant="outline"
                        size="sm"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => setEditingTemplate(template)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  View Edit
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingTemplate && (
        <TextTemplateEditor
          isOpen={true}
          onClose={() => setEditingTemplate(null)}
          template={editingTemplate}
          onUpdateTemplate={(updates) => updateTemplate(editingTemplate.id, updates)}
        />
      )}

      {imagePopupTemplate && (
        <ImagePopup
          isOpen={true}
          onClose={() => setImagePopupTemplate(null)}
          images={imagePopupTemplate.associatedImages}
          onAddImage={(base64) => handleAddImageToTemplate(imagePopupTemplate, base64)}
          onDeleteImage={(index) => handleDeleteImageFromTemplate(imagePopupTemplate, index)}
          title={`Images for Template #${imagePopupTemplate.id}`}
        />
      )}
    </div>
  );
};

export default BackgroundPage;
