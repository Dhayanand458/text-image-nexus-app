
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ImageManager from '@/components/ImageManager';
import { useProject } from '@/hooks/useProject';

interface MainImagePageProps {
  code: string;
}

const MainImagePage: React.FC<MainImagePageProps> = ({ code }) => {
  const navigate = useNavigate();
  const { project, addImage, deleteImage } = useProject(code);

  if (!project) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Main Image Page</h1>
            <Button 
              onClick={() => navigate('/background')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Go to Background
            </Button>
          </div>

          <ImageManager
            images={project.images}
            onAddImage={addImage}
            onDeleteImage={deleteImage}
          />
        </div>
      </div>
    </div>
  );
};

export default MainImagePage;
