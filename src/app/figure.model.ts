export interface Figure {
  id: number;
  name: string;
  character: string;
  series?: string;
  manufacturer?: string;
  scale?: string;
  imageUrl?: string;
  notes?: string;
  owned?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type FigureCreate = Omit<Figure, 'id' | 'owned' | 'createdAt' | 'updatedAt'>;
