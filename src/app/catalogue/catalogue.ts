import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { FigureService } from '../figure.service';
import { CollectionService } from '../collection.service';
import { AuthService } from '../auth.service';
import { Figure } from '../figure.model';

@Component({
  selector: 'app-catalogue',
  imports: [RouterLink],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css'
})
export class Catalogue implements OnInit {
  private figureService = inject(FigureService);
  private collectionService = inject(CollectionService);
  auth = inject(AuthService);

  figures = signal<Figure[]>([]);
  loading = signal(true);
  togglingId = signal<number | null>(null);

  ngOnInit() {
    this.load();
  }

  load() {
    this.figureService.getAll().subscribe({
      next: (data) => { this.figures.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  toggleCollection(figure: Figure) {
    if (this.togglingId()) return;
    this.togglingId.set(figure.id);
    const action: Observable<unknown> = figure.owned
      ? this.collectionService.removeFromCollection(figure.id)
      : this.collectionService.addToCollection(figure.id);

    action.subscribe({
      next: () => {
        this.figures.update(list =>
          list.map(f => f.id === figure.id ? { ...f, owned: !f.owned } : f)
        );
        this.togglingId.set(null);
      },
      error: () => this.togglingId.set(null)
    });
  }
}
