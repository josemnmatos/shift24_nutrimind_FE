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
  newMessage = '';
  messageList: string[] = [];

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
  }

  sendMessage() {
    this.websocketService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
