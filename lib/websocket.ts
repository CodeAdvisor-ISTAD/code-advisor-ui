import SockJS from 'sockjs-client';
import { Client, IFrame } from '@stomp/stompjs';
import { Notification } from '../types/notifications';

export class WebSocketService {
  private client: Client;
  private subscriptionCallback: ((notification: Notification) => void) | null = null;

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.subscribe();
      },
      onStompError: (frame: IFrame) => {
        console.error('STOMP error', frame);
      }
    });
  }

  connect(): void {
    this.client.activate();
  }

  disconnect(): void {
    this.client.deactivate();
  }

  onNotification(callback: (notification: Notification) => void): void {
    this.subscriptionCallback = callback;
    if (this.client.connected) {
      this.subscribe();
    }
  }

  private subscribe(): void {
    if (this.subscriptionCallback) {
      this.client.subscribe('/topic/notifications', (message) => {
        const notification = JSON.parse(message.body) as Notification;
        this.subscriptionCallback!(notification);
      });
    }
  }
}

