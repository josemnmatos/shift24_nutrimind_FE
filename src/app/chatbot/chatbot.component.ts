import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  Message,
  WebsocketService,
} from '../services/websocket/websocket.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
  providers: [WebsocketService, HttpClient],
})
export class ChatbotComponent {
  newMessage = '';
  messageList_bot: string[] = [''];
  messageList_user: string[] = [];
  num_messages = 0;

  private subscription: Subscription;

  constructor(
    private websocketService: WebsocketService,
    private http: HttpClient
  ) {
    this.subscription = this.websocketService
      .getNewMessage()
      .subscribe((message: string) => {
        this.messageList_bot[this.num_messages - 1] =
          this.messageList_bot[this.num_messages - 1] + message;
        //console.log(this.messageList_bot);
        let chatbot_box = document.getElementById('chatbot_box');

        if (chatbot_box) {
          chatbot_box.scrollTop = chatbot_box.scrollHeight;
        }
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
    //console.log(this.newMessage);
    this.messageList_user.push(this.newMessage);
    this.websocketService.sendMessage(this.newMessage);
    this.newMessage = '';
    this.messageList_bot.push('');
    //console.log(this.messageList);
    this.num_messages++;
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
