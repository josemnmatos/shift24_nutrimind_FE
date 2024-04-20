import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { WebsocketService } from '../services/websocket/websocket.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgClass } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription, takeUntil } from 'rxjs';

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
  providers: [WebsocketService, HttpClient],
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

  private subscription: Subscription;

  constructor(
    private websocketService: WebsocketService,
    private http: HttpClient
  ) {
    this.subscription = this.websocketService
      .getNewMessage()
      .subscribe((message: string) => {
        this.messageList.push(message);
      });
  }

  ngOnInit() {
    this.getConversationId();
  }

  ngOnDestroy() {
    this.websocketService.unsubscribe();
    this.subscription.unsubscribe();

    console.log('UNSUBSCRIBE');
  }

  sendMessage() {
    //this.websocketService.sendMessage(this.newMessage);
    this.messageHistory.push(this.userInputMessage);
    this.userInputMessage = {
      message: '',
      isBot: false,
    };
  }

  // get request to the server endpoint to create a conversationId
  getConversationId() {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token') || '',
      }),
    };

    console.log(requestOptions);

    this.http
      .get('http://localhost:8000/api/create_conversation/', requestOptions)
      .subscribe((data) => {
        //data comes as {conversation_id: '0'}
        //store in local storage
        localStorage.setItem(
          'conversationId',
          (data as any)['conversation_id']
        );
        console.log((data as any).conversation_id);
      });
  }

  // get request to the server endpoint to create a conversationId
  getConversationId() {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token') || '',
      }),
    };

    console.log(requestOptions);

    this.http
      .get('http://localhost:8000/api/create_conversation/', requestOptions)
      .subscribe((data) => {
        //data comes as {conversation_id: '0'}
        //store in local storage
        localStorage.setItem(
          'conversationId',
          (data as any)['conversation_id']
        );
        console.log((data as any).conversation_id);
      });
  }
}
