
export interface Template {
  id: number;
  texts: string[];
  currentTextIndex: number;
  associatedImages: string[];
}

export interface Project {
  code: string;
  images: string[];
  templates: Template[];
}
