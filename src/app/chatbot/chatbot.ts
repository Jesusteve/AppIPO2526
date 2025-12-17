// simple-chat.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IAServ } from '../services/ia.serv';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatBot implements OnInit {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  messages: Array<{ text: string, isUser: boolean, time: Date }> = [];
  userInput: string = '';
  isTyping: boolean = false;

  constructor(private aiService: IAServ) { }

  ngOnInit() {
    // Mensaje de bienvenida automático
    setTimeout(() => {
      this.addBotMessage('¡Hola! Soy tu asistente IA básico. ¿En qué puedo ayudarte?');
    }, 500);
  }

  sendMessage(): void {
    if (!this.userInput.trim() || this.isTyping) return;

    
    this.addUserMessage(this.userInput);
    const userMessage = this.userInput;
    this.userInput = '';

    // Simular que el bot está "pensando"
    this.isTyping = true;

    
    setTimeout(() => {
      
      const botResponse = this.aiService.getResponse(userMessage);
      this.addBotMessage(botResponse);
      this.isTyping = false;
      this.scrollToBottom();
    }, 800 + Math.random() * 700); // Pausa aleatoria entre 800-1500ms
  }

  quickQuestion(question: string): void {
    this.userInput = question;
    this.sendMessage();
  }

  private addUserMessage(text: string): void {
    this.messages.push({
      text: text,
      isUser: true,
      time: new Date()
    });
    this.scrollToBottom();
  }

  private addBotMessage(text: string): void {
    this.messages.push({
      text: text,
      isUser: false,
      time: new Date()
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop =
          this.messageContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  clearChat(): void {
    this.messages = [];
    this.addBotMessage('¡Conversación reiniciada! ¿En qué puedo ayudarte?');
  }
}
