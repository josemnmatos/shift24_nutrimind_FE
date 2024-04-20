import { Component } from '@angular/core';
import {
  Message,
  WebsocketService,
} from '../services/websocket/websocket.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
  providers: [WebsocketService],
})
export class ChatbotComponent {
  title = 'socketrv';
  content = '';
  received: Message[] = [];
  sent: Message[] = [];

  constructor(private WebsocketService: WebsocketService) {
    WebsocketService.messages.subscribe((msg) => {
      this.received.push(msg);
      console.log('Response from websocket: ' + msg);
    });
  }

  sendMsg() {
    let message = {
      source: '',
      content: '',
    };
    message.source = 'localhost';
    message.content = this.content;

    this.sent.push(message);
    this.WebsocketService.messages.next(message);
  }
}
