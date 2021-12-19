import { ProfileComponent } from './profile/profile.component';
import { SavedCitiesComponent } from './saved-cities/saved-cities.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'login',
  pathMatch: 'full',
  component: LoginComponent
}, {
  path: 'cities/:id',
  pathMatch: 'full',
  component: SavedCitiesComponent
}, {
  path: 'profile',
  pathMatch: 'full',
  component: ProfileComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
