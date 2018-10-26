import { Component, OnInit } from '@angular/core';

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
  currentUser: User;
  posts: Post[];

  constructor(
    private _auth: AuthService,
    private network: NetworkService
  ) { }

  async ngOnInit() {
    const currentUser = await this._auth.fetchCurrentUserInfo();

    this.currentUser = currentUser;

    this.posts = await this.getPosts();
  }

  async getPosts() {
    const response =  await this.network.request('get', 'posts') as Array<any>;

    return response.map(item => new Post({
      authorId: item.auth_id,
      content: item.content,
      createdAt: item.created_at
    }));
  }

  addEntry(entry) {
    alert(entry.content);
  }

}
