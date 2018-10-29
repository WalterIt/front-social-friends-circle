import { Injectable, EventEmitter } from '@angular/core';
import  Echo  from '../../../../node_modules/laravel-echo';

import { User } from '../entities/User';

/*
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
*/


@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  echo: Echo = null;

  setupWithToken(token) {
    if (!token) {
      this.echo = null;

      return;
    }

    this.echo = new Echo({
      broadcaster: 'socket.io',
      host: 'http://192.168.99.100:6001',
      auth: {
          headers: {
              'Authorization': 'Bearer ' + token
          }
      }
    });

    window['echo'] = this.echo;

    this.listen();
  }

  listen() {
    this.echo.private('test-channel')
      .listen('.test', (e) => {           // callback function
          console.log(e);
          alert('Received TEST event via Sockets private, secured channel!');
      });
  }

}
