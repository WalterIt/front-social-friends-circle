import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../entities/User';

const URL = 'http://192.168.99.100/api/';
const DEFAULT_TOKEN_STORAGE_KEY = 'AUTH_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User;
  private cachedToken;

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.buildURL('auth/register'), {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    }).toPromise();
  }

  async login(user: User) {
    try {
      const response = await this.http.post(this.buildURL('auth/login'), {
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
      const response = await this.http.get(this.buildURL('auth/me'), {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).toPromise();

      this.currentUser = new User(
        response['firstName'],
        response['lastName'],
        response['email']
      );

      return this.currentUser;

    } catch (error) {
      throw error;
    }
  }

  get token() {
    if (this.cachedToken) {
      return this.cachedToken;
    }

    const tokenFromStorage = localStorage.getItem(DEFAULT_TOKEN_STORAGE_KEY);

    if (tokenFromStorage) {
      this.cachedToken = tokenFromStorage;

      return tokenFromStorage;
    }
  }

  set token(value) {
    this.cachedToken = value;

    if (value) {
      localStorage.setItem(DEFAULT_TOKEN_STORAGE_KEY, value);
    } else {
      localStorage.removeItem(DEFAULT_TOKEN_STORAGE_KEY);
    }
  }

    buildURL(path) {
      return URL + path;
    }
}
