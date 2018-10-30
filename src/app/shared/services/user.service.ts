import { Injectable } from '@angular/core';

import toastr from './../../../../node_modules/toastr/toastr';  // "node_modules/toastr/toastr"

import { NetworkService } from './network.service';
import { SocketsService, FriendAddedEvent, FriendRemovedEvent } from './sockets.service';
import { AuthService } from './auth.service';
import { User } from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _cache: any = {};

  constructor(
    private _network: NetworkService,
    private _sockets: SocketsService,
    private _auth: AuthService
  ) {
    this._sockets.friendAddedEventFired.subscribe({
      next: this.handleFriendAddedEvent.bind(this)
    });

    this._sockets.friendRemovedEventFired.subscribe({
      next: this.handleFriendRemovedEvent.bind(this)
    });
  }

  async getUserDetails(id) {
    const cached = this._cache[id];

    if (cached) {
      if (cached.user) {
        return cached.user;
      }

      return cached.fetchPromise;
    }

    const fetchPromise = new Promise(async (resolve) => {
      const response = await this._network.request(
        'get',
        `users/${id}`
      );

      const user = this.deserializeUser(response);

      this._cache[id] = {
        user,
        fetchPromise: null
      };

      resolve(user);
    });

    this._cache[id] = {
      user: null,
      fetchPromise
    };

    return fetchPromise;
  }

  deserializeUser(json) {
    return new User(
      json['firstName'],
      json['lastName'],
      json['email'],
      null,
      json['id']
    );
  }

  handleFriendAddedEvent(event: FriendAddedEvent) {
    const initiator = this.deserializeUser(event.initiator);

    if (!this._auth.currentUser.isFriendOf(initiator)) {
      this._auth.currentUser.friends.push(initiator);
      toastr.info(`${initiator.fullName} added you as friend!`);
    }
  }

  handleFriendRemovedEvent(event: FriendRemovedEvent) {
    const initiator = this.deserializeUser(event.initiator);

    if (this._auth.currentUser.isFriendOf(initiator)) {
      this._auth.currentUser.friends = this._auth.currentUser.friends.filter(
        user => user.id !== initiator.id
      );

      toastr.info(`${initiator.fullName} removed you from friends!`);
    }
  }
}
