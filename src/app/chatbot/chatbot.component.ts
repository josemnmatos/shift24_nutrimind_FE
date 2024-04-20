import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket/websocket.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgClass } from '@angular/common';

export interface ChatMessage {
  message: string;
  isBot: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
  providers: [WebsocketService],
})
export class ChatbotComponent {
  userInputMessage: ChatMessage = {
    message: '',
    isBot: false,
  };

  messageHistory: ChatMessage[] = [
    {
      message: 'Hello, how can I help you?',
      isBot: true,
    },
    {
      message: 'Hello, I need help with my account.',
      isBot: false,
    },
  ];

  constructor() {} //private websocketService: WebsocketService

  ngOnInit() {
    //this.websocketService.getNewMessage().subscribe((message: string) => {
    // this.messageList.push(message);
    //});
  }

  sendMessage() {
    //this.websocketService.sendMessage(this.newMessage);
    this.messageHistory.push(this.userInputMessage);
    this.userInputMessage = {
      message: '',
      isBot: false,
    };
  }
}
