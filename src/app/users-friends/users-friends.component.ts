import { Component, OnInit } from '@angular/core';
import { User } from '../shared/entities/User';
import { NetworkService } from '../shared/services/network.service';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-users-friends',
  templateUrl: './users-friends.component.html',
  styleUrls: ['./users-friends.component.css']
})
export class UsersFriendsComponent implements OnInit {
  currentUser : User;
  users : User[];

  constructor(
    private _network: NetworkService,
    private _auth: AuthService
  ) { }

  async ngOnInit() {
    const currentUser = await this._auth.fetchCurrentUserInfo();

    this.currentUser = currentUser;

    this.users = await this.getUsersAndFriends();
  }

  async getUsersAndFriends() {
    const users = await this._network.request('get', 'users') as Array<any>;
    const friends = await this._network.request('get', 'users/friends') as Array<any>;

    this.currentUser.friends = friends.map(
      item => new User(
        item['firstName'], item['lastName'], item['email'], null, item['id']
      )
    );

    // LIST OF USERS EXCEPT OURSELVES
    return users
      .filter(i => i.id !== this.currentUser.id)
      .map(
        item => new User(
          item['firstName'], item['lastName'], item['email'], null, item['id']
        )
      );
  }

  async addFriend(user: User) {
    const response = await this._network.request(
      'post', `users/${user.id}/add_friend`
    ) as Array<any>;

    if (response['success']) {
      this.currentUser.friends.push(user);
    }
  }

  async removeFriend(user : User) {
    const response = await this._network.request(
      'post', `users/${user.id}/remove_friend`
    ) as Array<any>;

    if (response['success']) {
      this.currentUser.friends = this.currentUser.friends.filter(
        i => i.id !== user.id
      );
    }
  }
}
