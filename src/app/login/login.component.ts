import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../shared/entities/User';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public model : User;

  constructor(
    private _auth : AuthService,
    private _router : Router
  ) { }

  ngOnInit() {
    this.model = new User();
  }

  async login() {
    await this._auth.login(this.model);

    // alert('GOING TO FEED ...');
     this._router.navigate(['feed']);
  }

}
