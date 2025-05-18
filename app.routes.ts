import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FarewellJournalComponent } from './pages/farewell-journal/farewell-journal.component';


export const routes: Routes = [
  { path: '', component: FarewellJournalComponent  },
  { path: 'register', component: RegisterComponent },
];
