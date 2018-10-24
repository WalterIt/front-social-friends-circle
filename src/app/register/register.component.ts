
import { Component, OnInit } from '@angular/core';

import { User } from '../shared/entities/User';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public model: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.model = new User();
  }

  submitHandler() {
     this.auth.register(this.model);
    // alert('Ok ');
  }

}
