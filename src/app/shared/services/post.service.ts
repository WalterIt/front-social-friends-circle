import { Injectable } from '@angular/core';

import { Post } from '../entities/Posts';
import { NetworkService } from './network.service';
import { SocketsService, PostCreatedEvent } from './sockets.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts : Post[] = []

  constructor(
    private _network : NetworkService,
    private _sockets : SocketsService
  ) {
    this._sockets.postCreatedEventFired.subscribe({
      next: this.handlePostCreatedEvent.bind(this)
    });
  }

  async fetchPosts() {
    const response = await this._network.request('get', 'posts') as Array<any>;

    this.posts = response.map(this.deserializePost);
  }

  async addPost(post) {
    const response = await this._network.request('post', 'posts', {
      body: post
    });

    this.posts.unshift(this.deserializePost(response));
  }

  async handlePostCreatedEvent(event : PostCreatedEvent) {
    console.log('post created event', event);
    if (!this.posts.find(p => p.id === event.post.id)) {
      this.posts.unshift(this.deserializePost(event.post));
    }
  }

  deserializePost(json) {
    return new Post({
      id: json['id'],
      authorId: json['author_id'],
      content: json['content'],
      createdAt: json['created_at']
    });
  }
}
