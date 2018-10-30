import { Component, OnInit, Input } from '@angular/core';

import * as moment from 'moment';

import { Post } from '../shared/entities/Posts';
import { User } from '../shared/entities/User';
import { UserService } from '../shared/services/user.service';

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
    private _userService : UserService
  ) { }

  async ngOnInit() {
    this.author = await this._userService.getUserDetails(this.post.authorId);

    this.timePassed = moment(this.post.createdAt).fromNow();
  }

}
