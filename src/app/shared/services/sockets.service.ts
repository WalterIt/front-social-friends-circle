import { Injectable, EventEmitter } from '@angular/core';
import  Echo  from '../../../../node_modules/laravel-echo';

import { User } from '../entities/User';


export class PostCreatedEvent {
  post : any;
  author : any;
}


export class FriendAddedEvent {
  initiator : any;
  friend : any;
}

export class FriendRemovedEvent {
  initiator : any;
  friend : any;
}



@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  echo: Echo = null;
  user: User = null;

  public postCreatedEventFired = new EventEmitter<PostCreatedEvent>()
  public friendAddedEventFired = new EventEmitter<FriendAddedEvent>()
  public friendRemovedEventFired = new EventEmitter<FriendRemovedEvent>()

  setup(token : string, user : User) {
    if (!token || !user) {
      this.echo = null;

      return;
    }

    this.user = user;

    this.echo = new Echo({
      broadcaster: 'socket.io',
      host: 'http://192.168.99.100:6001',
      auth: {
          headers: {
              'Authorization': 'Bearer ' + token
          }
      }
    });

    this.listen();
  }

  listen() {
    this.echo.private(`App.User.${this.user.id}`)
      .listen(
        'PostCreated',
        (event) => this.postCreatedEventFired.emit(event)
      )
      .listen(
        'FriendAdded',
        (event) => this.friendAddedEventFired.emit(event)
      )
      .listen(
        'FriendRemoved',
        (event) => this.friendRemovedEventFired.emit(event)
      );
  }
}
