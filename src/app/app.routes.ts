import { Routes } from '@angular/router';
import { WarningpageComponent } from './pages/warningpage/warningpage.component';
import { MainComponent } from './pages/main/main.component';
import { FeedComponent } from './pages/feed/feed.component'; // ✅ Add this import
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'warning', component: WarningpageComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent },
  { path: 'feed', component: FeedComponent }, // ✅ Register Feed route
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
