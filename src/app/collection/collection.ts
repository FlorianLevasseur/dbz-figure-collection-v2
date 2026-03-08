import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CollectionService, UserFigure } from '../collection.service';

@Component({
  selector: 'app-collection',
  imports: [RouterLink],
  templateUrl: './collection.html',
  styleUrl: './collection.css'
})
export class Collection implements OnInit {
  private collectionService = inject(CollectionService);

  items = signal<UserFigure[]>([]);
  loading = signal(true);
  removingId = signal<number | null>(null);

  ngOnInit() {
    this.load();
  }

  load() {
    this.collectionService.getCollection().subscribe({
      next: (data) => { this.items.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  remove(item: UserFigure) {
    if (this.removingId()) return;
    this.removingId.set(item.figureId);
    this.collectionService.removeFromCollection(item.figureId).subscribe({
      next: () => {
        this.items.update(list => list.filter(i => i.figureId !== item.figureId));
        this.removingId.set(null);
      },
      error: () => this.removingId.set(null)
    });
  }
}
