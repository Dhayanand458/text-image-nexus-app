
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Project, Template } from '@/types';
import { toast } from 'sonner';

export const useProject = (code: string | null) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (code) {
      loadProject(code);
    }
  }, [code]);

  const loadProject = async (projectCode: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'projects', projectCode);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProject(docSnap.data() as Project);
      } else {
        // Create new project
        const newProject: Project = {
          code: projectCode,
          images: [],
          templates: []
        };
        await setDoc(docRef, newProject);
        setProject(newProject);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (updates: Partial<Project>) => {
    if (!code || !project) return;
    
    try {
      const docRef = doc(db, 'projects', code);
      await updateDoc(docRef, updates);
      setProject(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  const addImage = async (base64Image: string) => {
    if (!project) return;
    const newImages = [...project.images, base64Image];
    await updateProject({ images: newImages });
  };

  const deleteImage = async (index: number) => {
    if (!project) return;
    const newImages = project.images.filter((_, i) => i !== index);
    await updateProject({ images: newImages });
  };

  const addTemplate = async () => {
    if (!project) return;
    const newTemplate: Template = {
      id: Date.now(),
      texts: [],
      currentTextIndex: 0,
      associatedImages: []
    };
    const newTemplates = [...project.templates, newTemplate];
    await updateProject({ templates: newTemplates });
  };

  const updateTemplate = async (templateId: number, updates: Partial<Template>) => {
    if (!project) return;
    const newTemplates = project.templates.map(template =>
      template.id === templateId ? { ...template, ...updates } : template
    );
    await updateProject({ templates: newTemplates });
  };

  const deleteTemplate = async (templateId: number) => {
    if (!project) return;
    const newTemplates = project.templates.filter(template => template.id !== templateId);
    await updateProject({ templates: newTemplates });
  };

  return {
    project,
    loading,
    addImage,
    deleteImage,
    addTemplate,
    updateTemplate,
    deleteTemplate
  };
};
