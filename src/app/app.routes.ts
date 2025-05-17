import { Routes } from '@angular/router';
import { WarningpageComponent } from './pages/warningpage/warningpage.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  { path: '', component: WarningpageComponent },           // default is warning
  { path: 'main', component: MainComponent },          // navigates after click
];
