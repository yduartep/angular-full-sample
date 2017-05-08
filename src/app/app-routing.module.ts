import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { PageNotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './core/auth.guard';
import { LoginGuard } from './core/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'heroes',
    loadChildren: 'app/heroes/heroes.module#HeroesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'villains',
    loadChildren: 'app/villains/villains.module#VillainsModule',
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
