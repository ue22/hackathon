import { Routes } from '@angular/router';
import { WarningpageComponent } from './pages/warningpage/warningpage.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  { path: '', component: WarningpageComponent },           // default is warning
  { path: 'main', component: MainComponent },              // main page after click
  { path: '**', redirectTo: '', pathMatch: 'full' }        // fallback to warning
];
