import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../service/WebSocketService';

@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styleUrls: ['./working.component.css']
})
export class WorkingComponent implements OnInit {
  user: '';
  group: '';
  message: '';
  notifications: string[] = [];
  webSocketService: WebSocketService;
  webSocketEndPoint = 'http://localhost:8080/notify';
  topic = '/topic/notify/';
  taskNotification: string;

  constructor() { }

  ngOnInit(): void {
    this.webSocketService = new WebSocketService();
    this.webSocketService.webSocketEndPoint = this.webSocketEndPoint;
    this.webSocketService.topic = this.topic;
  }

  connect(): void {
    console.log('Login with user: ' + this.user);
    this.webSocketService.fromUser = this.user;
  }

  notifyGroup(): void {
    console.log('Join group: ' + this.group);
    const $this = this;
    $this.webSocketService.$connect();
    const ws = this.webSocketService;

    // tslint:disable-next-line:only-arrow-functions typedef
    ws.stompClient.connect({}, function(frame) {
      console.log('connected to: ' + frame);
      // tslint:disable-next-line:only-arrow-functions typedef
      ws.stompClient.subscribe(ws.topic + $this.group, function(response) {
        const newNotification = JSON.parse(response.body).message;
        console.log(newNotification);
        $this.notifications.push(newNotification);
      });
    }, ws.errorCallBack);
  }

  getA(): void {
    this.taskNotification = this.user + ' get task A';
    this.webSocketService.$send(this.group, this.taskNotification, '/app/notify/');
  }

  getB(): void {
    this.taskNotification = this.user + ' get task B';
    this.webSocketService.$send(this.group, this.taskNotification, '/app/notify/');
  }

  getC(): void {
    this.taskNotification = this.user + ' get task C';
    this.webSocketService.$send(this.group, this.taskNotification, '/app/notify/');
  }
}
