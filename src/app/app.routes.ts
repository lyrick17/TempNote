import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  // { path: 'about', component: About},
  // { path: 'terms-and-conditions', component: TermsAndConditions},
  // { path: 'privacy-policy', component: PrivacyPolicy},
  { path: '**', redirectTo: '' },
];
