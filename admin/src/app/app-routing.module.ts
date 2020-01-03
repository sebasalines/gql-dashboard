import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthScreenComponent } from './modules/auth/components/auth-screen.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthScreenComponent },
  { path: 'dashboard', component: DashboardComponent, canLoad: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
