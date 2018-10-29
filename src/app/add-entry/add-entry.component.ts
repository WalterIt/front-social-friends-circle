import { Component, OnInit, Input } from '@angular/core';
import { POST_VISIBILITY_STATUS } from '../shared/entities/Posts';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {
  @Input() onClick;

  model = {
    content: '',
    visibility: POST_VISIBILITY_STATUS.PUBLIC
  }

  constructor() { }

  ngOnInit() {
  }

  sharePublicly() {
    this.model.visibility = POST_VISIBILITY_STATUS.PUBLIC;

    this.onClick(this.model);
  }

  shareForFriends() {
    this.model.visibility = POST_VISIBILITY_STATUS.ONLY_FRIENDS;

    this.onClick(this.model);
  }
}
