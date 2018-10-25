import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entities/User';

const URL = 'http://192.168.99.100/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.buildURL('register'), {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    }).toPromise();
    // throw new Error('Not implemented yet!');
  }

  login(user: User) {
    return this.http.post(this.buildURL('auth'), {
      username: user.email,
      password: user.password
    }).toPromise();
  }


  buildURL(path) {
    return URL + path;
  }


}
