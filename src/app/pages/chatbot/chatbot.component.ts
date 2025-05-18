import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  @Input() mood: string = ''; 
  isChatOpen = false;
  userInput = '';
  isLoading = false;
  personalityRequired = false;

  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  botName = 'Exit Guide 🤖';
  personality: 'sassy' | 'dramatic' | 'chill' | 'supportive' | 'savage' | null = null;

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;

    if (this.isChatOpen && this.messages.length === 0) {
      this.messages.push({
        text: 'Hiii ender, choose a personality you want me to use 😄',
        sender: 'bot'
      });
    }
  }

  selectPersonality(p: 'sassy' | 'dramatic' | 'chill' | 'supportive' | 'savage') {
    this.personality = p;
    this.personalityRequired = false;
    this.messages.push({
      text: `Okayyy! I'm now in ${p.toUpperCase()} mode 🤖✨`,
      sender: 'bot'
    });
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    if (!this.personality) {
      this.personalityRequired = true;
      return;
    }

    const userMsg = this.userInput;
    this.messages.push({ text: userMsg, sender: 'user' });
    this.userInput = '';
    this.isLoading = true;

    // Show typing...
    this.messages.push({ text: 'Typing...', sender: 'bot' });
    this.scrollToBottom();

    this.http.post<{ reply: string }>('http://localhost:5005/chat', {
      message: userMsg,
      personality: this.personality
    }).subscribe({
      next: (response) => {
        this.messages.pop(); // remove 'Typing...'
        this.messages.push({ text: response.reply, sender: 'bot' });
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: (err) => {
        this.messages.pop(); // remove 'Typing...'
        console.error('Error:', err);
        this.messages.push({ text: 'Something went wrong talking to Gemini 😢', sender: 'bot' });
        this.isLoading = false;
        this.scrollToBottom();
      }
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      const el = document.querySelector('.chat-messages');
      el?.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, 100);
  }
}
