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

  socket = io('http://64.227.122.94:8000');

  public sendMessage(message: any) {
    console.log('sendMessage: ', message);
    this.socket.emit('new_message', {
      conversationId: '0',
      content: message,
    });
  }

  public getNewMessage = () => {
    this.socket.on('new_message_r', (message) => {
      this.message$.next(message);
      console.log('getNewMessage: ', message);
    });

    return this.message$.asObservable();
  };
}
