import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ReferenceService {
  private http = inject(HttpClient);

  getCharacters() {
    return this.http.get<{ id: number; name: string }[]>('http://localhost:3000/api/characters');
  }

  getSeries() {
    return this.http.get<{ id: number; name: string }[]>('http://localhost:3000/api/series');
  }
}
