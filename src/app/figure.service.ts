import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Figure, FigureCreate } from './figure.model';

@Injectable({ providedIn: 'root' })
export class FigureService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/figures';

  getAll() {
    return this.http.get<Figure[]>(this.apiUrl);
  }

  getOne(id: number) {
    return this.http.get<Figure>(`${this.apiUrl}/${id}`);
  }

  create(data: FigureCreate) {
    return this.http.post<Figure>(this.apiUrl, data);
  }

  update(id: number, data: Partial<FigureCreate>) {
    return this.http.put<Figure>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
