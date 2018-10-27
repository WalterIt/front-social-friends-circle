import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../shared/entities/Posts';

import * as moment from 'moment';

import { NetworkService } from '../shared/services/network.service';
import { User } from '../shared/entities/User';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  @Input() post: Post;

  author: User;

  timePassed;

  // timePassed = moment(this.post.createdAt).fromNow();

  constructor(
    private _network : NetworkService
  ) { }

  ngOnInit() {
    this.getUserDetails();

    this.timePassed = moment(this.post.createdAt).fromNow();
  }

  async getUserDetails() {
    const response = await this._network.request(
      'get',
      `users/${this.post.authorId}`
    );

    this.author = new User(response['firstName'], response['lastName']);
  }

}
