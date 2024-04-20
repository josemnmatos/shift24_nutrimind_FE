import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';

export interface Message {
  source: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  //localStorage.getItem('token')

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpkdW5hcyJ9.aVh73ElHuomPK5R1uxupvtwLtTelvUkfLO1oOKL1LGU
  socket = io('http://localhost:8000', {
    extraHeaders: {
      Authorization: localStorage.getItem('token') || '',
    },
  });

  public sendMessage(message: any) {
    console.log('sendMessage: ', message);
    this.socket.emit('new_message', {
      conversationId: localStorage.getItem('conversationId') || '',
      content: message,
    });
  }

  public unsubscribe() {
    this.socket.disconnect();
  }

  public getNewMessage = () => {
    this.socket.on('new_message_r', (message) => {
      console.log(localStorage.getItem('uuid'));
      console.log(message.roomName);
      //if (message.roomName === localStorage.getItem('uuid')) {
      this.message$.next(message);
      console.log('getNewMessage: ', message);
      //}
    });

    return this.message$.asObservable();
  };
}
