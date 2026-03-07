import { Routes } from '@angular/router';
import { FigureList } from './figures/figure-list/figure-list';
import { FigureForm } from './figures/figure-form/figure-form';

export const routes: Routes = [
  { path: '', redirectTo: 'figures', pathMatch: 'full' },
  { path: 'figures', component: FigureList },
  { path: 'figures/new', component: FigureForm },
];
