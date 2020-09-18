import { Injectable, ɵConsole } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private wsService: WebsocketService
  ) { }

  sendMessage( mensaje: string) {
    const payload = {
      de: 'Nacho',
      cuerpo: mensaje
    };
    this.wsService.emit('mensaje', payload);
  }
  getMensjes() {
    return this.wsService.listen('mensajes-nuevo');
  }
}
