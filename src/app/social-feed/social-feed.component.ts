import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/entities/User';
import { NetworkService } from '../shared/services/network.service';
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
    private _network : NetworkService,
    private _router : Router
  ) { }

  async ngOnInit() {
    const currentUser = await this._auth.fetchCurrentUserInfo();

    this.currentUser = currentUser;

    this.posts = await this.getPosts();

    this.addEntry = this.addEntry.bind(this);
  }

  async addEntry(entry) {
    const response = await this._network.request('post', 'posts', {
      body: entry
    });

    this.posts.unshift(new Post({
      authorId: response['author_id'],
      content: response['content'],
      createdAt: response['created_at']
    }));
  }

  async getPosts() {
    const response = await this._network.request('get', 'posts') as Array<any>;

    return response.map(item => new Post({
      authorId: item.author_id,
      content: item.content,
      createdAt: item.created_at
    }));
  }

  async logout() {
    this._auth.logout();
  }
}
