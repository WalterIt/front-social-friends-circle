/*
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/entities/User';




@Component({
  selector: 'app-social-feed',
  templateUrl: './social-feed.component.html',
  styleUrls: ['./social-feed.component.css']
})
export class SocialFeedComponent implements OnInit {
  currentUser : User;

  constructor(
    private _auth : AuthService
  ) { }

  async ngOnInit() {
    const currentUser = await this._auth.fetchCurrentUserInfo();

    this.currentUser = currentUser;
  }

  addEntry(entry) {
    alert(entry.content);
  }

}
*/
