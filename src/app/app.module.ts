import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule, MatButtonModule } from '@angular/material';

import { ApprRoutingModule } from './appr-routing.module';

import { AuthService } from './shared/services/auth.service';
import { NetworkService } from './shared/services/network.service';
import { SocketsService } from './shared/services/sockets.service';
import { UserService } from './shared/services/user.service';
import { PostService } from './shared/services/post.service';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { SocialFeedComponent } from './social-feed/social-feed.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { UsersFriendsComponent } from './users-friends/users-friends.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SocialFeedComponent,
    AddEntryComponent,
    SinglePostComponent,
    UsersFriendsComponent
  ],
  imports: [
    BrowserModule,
    ApprRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService, NetworkService, SocketsService, UserService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
