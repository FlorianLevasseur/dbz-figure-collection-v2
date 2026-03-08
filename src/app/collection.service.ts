import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Figure } from './figure.model';

export interface UserFigure {
  id: number;
  figureId: number;
  condition: string;
  price: number | null;
  purchaseDate: string | null;
  notes: string | null;
  figure: Figure;
}

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/collection';

  getCollection() {
    return this.http.get<UserFigure[]>(this.apiUrl);
  }

  addToCollection(figureId: number) {
    return this.http.post<UserFigure>(`${this.apiUrl}/${figureId}`, {});
  }

  removeFromCollection(figureId: number) {
    return this.http.delete<void>(`${this.apiUrl}/${figureId}`);
  }
}
