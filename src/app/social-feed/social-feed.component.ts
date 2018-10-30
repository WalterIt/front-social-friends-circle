import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { PostService } from '../shared/services/post.service';

import { User } from '../shared/entities/User';
import { Post } from '../shared/entities/Posts';

@Component({
  selector: 'app-social-feed',
  templateUrl: './social-feed.component.html',
  styleUrls: ['./social-feed.component.css']
})
export class SocialFeedComponent implements OnInit {
  currentUser : User;
  posts : Post[];

  constructor(
    private _auth : AuthService,
    private _postService : PostService,
    private _router : Router
  ) { }

  async ngOnInit() {
    const currentUser = await this._auth.fetchCurrentUserInfo();

    this.currentUser = currentUser;

    await this._postService.fetchPosts();

    this.posts =  this._postService.posts;

    this.addEntry = this.addEntry.bind(this);
  }

  async addEntry(entry) {
    return this._postService.addPost(entry);
  }

  async logout() {
    this._auth.logout();
  }
}
