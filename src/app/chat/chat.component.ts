import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../service/WebSocketService';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  webSocketService: WebSocketService;
  webSocketEndPoint = 'http://localhost:8080/chat';
  topic = '/topic/messages/';
  message = '';
  fromUser = '';
  toUser = '';
  historyChat: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.webSocketService = new WebSocketService();
  }

  // tslint:disable-next-line:typedef
  connect() {
    this.webSocketService.fromUser = this.fromUser;
    this.webSocketService.webSocketEndPoint = this.webSocketEndPoint;
    this.webSocketService.topic = this.topic;
    this.webSocketService.$connect();
    const $this = this;
    const ws = this.webSocketService;
    // tslint:disable-next-line:only-arrow-functions typedef
    ws.stompClient.connect({}, function(frame) {
      console.log('connected to: ' + frame);
      // tslint:disable-next-line:only-arrow-functions typedef
      ws.stompClient.subscribe(ws.topic + ws.fromUser, function(response) {
        const newMsg = JSON.parse(response.body);
        $this.historyChat.push(newMsg.from + ': ' + newMsg.message);
      });
    }, ws.errorCallBack);
  }

  // tslint:disable-next-line:typedef
  disconnect() {
    this.webSocketService.$disconnect();
  }

  // tslint:disable-next-line:typedef
  sendMsg() {
    this.webSocketService.$send(this.toUser, this.message, '/app/chat/');
    this.historyChat.push(this.fromUser + ': ' + this.message);
  }

  // tslint:disable-next-line:typedef
  inboxToUser() {
    console.log('Inbox to ' + this.toUser);
  }
}
