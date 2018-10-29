import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SocialFeedComponent } from './social-feed/social-feed.component';
import { UsersFriendsComponent } from './users-friends/users-friends.component';

const routes: Routes = [

  {path: 'users', component: UsersFriendsComponent},
  {path: 'feed', component: SocialFeedComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class ApprRoutingModule { }
