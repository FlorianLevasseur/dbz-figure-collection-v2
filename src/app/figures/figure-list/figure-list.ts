import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FigureService } from '../../figure.service';
import { Figure } from '../../figure.model';

@Component({
  selector: 'app-figure-list',
  imports: [RouterLink],
  templateUrl: './figure-list.html',
  styleUrl: './figure-list.css'
})
export class FigureList implements OnInit {
  private figureService = inject(FigureService);

  figures = signal<Figure[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.figureService.getAll().subscribe({
      next: (data) => {
        this.figures.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Impossible de charger les figures. Le serveur est-il démarré ?');
        this.loading.set(false);
      }
    });
  }

  delete(id: number) {
    if (!confirm('Supprimer cette figure ?')) return;
    this.figureService.delete(id).subscribe(() => {
      this.figures.update(list => list.filter(f => f.id !== id));
    });
  }
}
