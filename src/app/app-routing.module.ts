import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResultadoComponent } from './pages/resultado/resultado.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'resultado', component: ResultadoComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
