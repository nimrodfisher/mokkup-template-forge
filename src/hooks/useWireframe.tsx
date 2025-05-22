
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WireframeState } from '@/types/wireframeState';
import { createElementSlice } from '@/store/elementActions';
import { createScreenSlice } from '@/store/screenActions';
import { createTemplateSlice } from '@/store/templateActions';

// Re-export types for convenience
export type { ElementType, FilterVariant, KpiVariant, ButtonVariant, ButtonSize, 
  HeaderVariant, ShapeVariant, ChartVariant, Element, Screen, Template } from '../types/wireframe';

// Combine all slices into one store
export const useWireframe = create<WireframeState>()(
  persist(
    (...a) => ({
      ...createElementSlice(...a),
      ...createScreenSlice(...a),
      ...createTemplateSlice(...a),
    }),
    {
      name: 'wireframe-storage',
    }
  )
);
