import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FigureService } from '../../figure.service';
import { ReferenceService } from '../../reference.service';

@Component({
  selector: 'app-figure-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './figure-form.html',
  styleUrl: './figure-form.css'
})
export class FigureForm implements OnInit {
  private fb = inject(FormBuilder);
  private figureService = inject(FigureService);
  private referenceService = inject(ReferenceService);
  private router = inject(Router);

  submitting = false;
  characters = signal<string[]>([]);
  seriesList = signal<string[]>([]);

  form = this.fb.group({
    name: ['', Validators.required],
    character: ['', Validators.required],
    series: [''],
    manufacturer: [''],
    scale: [''],
    price: [null as number | null],
    purchaseDate: [''],
    condition: ['mint', Validators.required],
    imageUrl: [''],
    notes: ['']
  });

  ngOnInit() {
    this.referenceService.getCharacters().subscribe(data =>
      this.characters.set(data.map(c => c.name))
    );
    this.referenceService.getSeries().subscribe(data =>
      this.seriesList.set(data.map(s => s.name))
    );
  }

  submit() {
    if (this.form.invalid) return;
    this.submitting = true;

    const value = this.form.value;
    const payload = {
      ...value,
      price: value.price ? Number(value.price) : undefined,
      purchaseDate: value.purchaseDate ? new Date(value.purchaseDate).toISOString() : undefined,
      series: value.series || undefined,
      manufacturer: value.manufacturer || undefined,
      scale: value.scale || undefined,
      imageUrl: value.imageUrl || undefined,
      notes: value.notes || undefined,
    };

    this.figureService.create(payload as any).subscribe({
      next: () => this.router.navigate(['/figures']),
      error: () => { this.submitting = false; }
    });
  }
}
