import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Catalogue } from './catalogue/catalogue';
import { Collection } from './collection/collection';
import { FigureForm } from './figures/figure-form/figure-form';
import { authGuard, adminGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogue', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'catalogue', component: Catalogue, canActivate: [authGuard] },
  { path: 'collection', component: Collection, canActivate: [authGuard] },
  { path: 'admin/figures/new', component: FigureForm, canActivate: [authGuard, adminGuard] },
];
