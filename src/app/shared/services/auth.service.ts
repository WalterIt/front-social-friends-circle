import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../entities/User';
import { SocketsService } from './sockets.service';

const BACKEND_DOMAIN = 'http://192.168.99.100';
const DEFAULT_TOKEN_STORAGE_KEY = 'AUTH_TOKEN';

@Injectable()
export class AuthService {
  public currentUser : User;

  private _cachedToken;

  constructor(
    private _http : HttpClient,
    private _router : Router,
    private _sockets: SocketsService
  ) { }

  register(user : User) {
    return this._http.post(this.buildURL('/api/auth/register'), {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    }).toPromise();
  }

  async login(user : User) {
    try {
      const response = await this._http.post(this.buildURL('/api/auth/login'), {
        email: user.email,
        password: user.password
      }).toPromise();

      const accessToken = response['access_token'];

      if (!accessToken) {
        return false;
      }

      this.token = accessToken;

      return true;
    } catch (error) {
      return false;
    }
  }

  async fetchCurrentUserInfo() {
    try {
      const response = await this._http.get(this.buildURL('/api/auth/me'), {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).toPromise();

      this.currentUser = new User(
        response['firstName'],
        response['lastName'],
        response['email'],
        null,
        response['id']
      );

      this._sockets.setup(this.token, this.currentUser);

      return this.currentUser;
    } catch (error) {
      console.error('error', error);
      this._router.navigate(['login']);
    }
  }

  get token() {
    if (this._cachedToken) {
      return this._cachedToken;
    }

    const tokenFromStorage = localStorage.getItem(DEFAULT_TOKEN_STORAGE_KEY);

    if (tokenFromStorage) {
      this._cachedToken = tokenFromStorage;

      return tokenFromStorage;
    }
  }

  set token(value) {
    this._cachedToken = value;

    if (value) {
      localStorage.setItem(DEFAULT_TOKEN_STORAGE_KEY, value);
    } else {
      localStorage.removeItem(DEFAULT_TOKEN_STORAGE_KEY);
    }
  }

  buildURL(path) {
    return BACKEND_DOMAIN + path;
  }

  logout() {
    this.token = null;

    this._router.navigate(['login']);
  }
}
