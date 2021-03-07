import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './adminPage/adminPage.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { RadioPageComponent } from './radioPage/radioPage.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path :'radio',
      component: RadioPageComponent
    },
    {
      path:'admin',
      component:AdminPageComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }