import { Injectable } from '@angular/core';

import { NetworkService } from './network.service';
import { SocketsService } from './sockets.service';
import { AuthService } from './auth.service';
import { User } from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _cache : any = {};

  constructor(
    private _network : NetworkService
  ) { }

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

      const user = new User(
        response['firstName'],
        response['lastName'],
        response['email'],
        null,
        response['id']
      );

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
}
