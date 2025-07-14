import { Template } from '@/types/wireframe';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export class TemplateService {
  static async saveTemplate(
    templateData: {
      id?: string;
      name: string;
      screens: any[];
      elements: any[];
    }
  ): Promise<Template> {
    const now = Date.now();
    
    if (templateData.id) {
      // Update existing template
      const { error } = await supabase
        .from('templates')
        .update({ 
          name: templateData.name,
          screens: JSON.stringify(templateData.screens),
          elements: JSON.stringify(templateData.elements),
          updated_at: new Date(now).toISOString()
        })
        .eq('id', templateData.id);
        
      if (error) throw error;
      
      return {
        id: templateData.id,
        name: templateData.name,
        screens: templateData.screens,
        elements: templateData.elements,
        createdAt: 0, // This will be updated from the existing template
        updatedAt: now,
      };
    } else {
      // Create new template
      const newId = uuidv4();
      const { error } = await supabase
        .from('templates')
        .insert({ 
          id: newId,
          name: templateData.name,
          screens: JSON.stringify(templateData.screens),
          elements: JSON.stringify(templateData.elements),
          created_at: new Date(now).toISOString(),
          updated_at: new Date(now).toISOString()
        });
        
      if (error) throw error;
      
      return {
        id: newId,
        name: templateData.name,
        screens: templateData.screens,
        elements: templateData.elements,
        createdAt: now,
        updatedAt: now,
      };
    }
  }

  static async loadTemplate(id: string): Promise<Template | null> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    if (!data) return null;
    
    return {
      id: data.id,
      name: data.name,
      screens: JSON.parse(data.screens as string),
      elements: JSON.parse(data.elements as string),
      createdAt: new Date(data.created_at).getTime(),
      updatedAt: new Date(data.updated_at).getTime(),
    };
  }

  static async deleteTemplate(id: string): Promise<void> {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }

  static async fetchTemplates(): Promise<Template[]> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('updated_at', { ascending: false });
      
    if (error) throw error;
    
    if (!data) return [];
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      screens: JSON.parse(item.screens as string),
      elements: JSON.parse(item.elements as string),
      createdAt: new Date(item.created_at).getTime(),
      updatedAt: new Date(item.updated_at).getTime(),
    }));
  }
}