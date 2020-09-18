import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  element: HTMLElement;
  texto = '';
  msgSubscription: Subscription;
  mensajes: any[] = [];
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.msgSubscription = this.chatService.getMensjes().subscribe( msg => {
      this.mensajes.push(msg);
      this.element = document.getElementById('chat-mensajes')
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 50);
    });
  }
  enviar(){
    if( this.texto.trim().length === 0){
      return;
    }
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

  ngOnDestroy() {
    this.msgSubscription.unsubscribe();
  }

}
