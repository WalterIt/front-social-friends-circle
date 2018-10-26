import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NetworkService {
  backendDomain = 'http://192.168.99.100';
  namespace = '/api';

  constructor(
    private _auth : AuthService,
    private _http : HttpClient
  ) { }

  public async request(type, url, options = {}, addNamespace = true) {
    url = this.buildURL(url, addNamespace);

    options = Object.assign(this.getDefaultOptions(), options);

    return await this._http.request(type, url, options).toPromise();
  }

  public getDefaultOptions() {
    return {
      headers: {
        Authorization: `Bearer ${this._auth.token}`
      }
    };
  }

  public buildURL(url, addNamespace) {
    let result = this.backendDomain;

    if (addNamespace) {
      result += this.namespace;
    }

    result += `/${url}`;

    return result;
  }
}
