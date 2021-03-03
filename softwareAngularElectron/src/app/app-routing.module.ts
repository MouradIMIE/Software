import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { RadioPageComponent } from './radioPage/radioPage.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    { path: '', redirectTo: '', pathMatch: 'full' },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path :'radio',
      component: RadioPageComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }