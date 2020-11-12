import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

export class WebSocketService {
  webSocketEndPoint = '';
  topic = '';
  stompClient: any;
  fromUser = '';

  constructor() {
  }

  // tslint:disable-next-line:typedef
  $connect() {
    console.log('Initialize webSocket Connection...');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    console.log(this.fromUser + ' connecting to chat...');
  }

  // tslint:disable-next-line:typedef
  $disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // tslint:disable-next-line:typedef
  errorCallBack(error) {
    console.log(error);
    setTimeout(() => {
      this.$connect();
    }, 5000);
  }

  // tslint:disable-next-line:typedef
  $send(user: string, text: string, broker: string) {
    console.log('Calling logout api via webSocket');
    this.stompClient.send(broker + user, {}, JSON.stringify({
      from : this.fromUser,
      message : text
    }));
  }
}
