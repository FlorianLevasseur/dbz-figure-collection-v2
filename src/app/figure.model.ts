export interface Figure {
  id: number;
  name: string;
  character: string;
  series?: string;
  manufacturer?: string;
  scale?: string;
  price?: number;
  purchaseDate?: string;
  condition: string;
  imageUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type FigureCreate = Omit<Figure, 'id' | 'createdAt' | 'updatedAt'>;
