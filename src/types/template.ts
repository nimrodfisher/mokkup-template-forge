import { Template } from '@/types/wireframe';

export interface TemplateSlice {
  templates: Template[];
  activeTemplateId: string | null;
  
  saveTemplate: (name: string) => Promise<void>;
  loadTemplate: (id: string) => Promise<void>;
  createNewTemplate: () => void;
  deleteTemplate: (id: string) => Promise<void>;
  fetchTemplates: () => Promise<void>;
}