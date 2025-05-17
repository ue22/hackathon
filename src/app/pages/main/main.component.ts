import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  moods = ['happy', 'sad', 'angry', 'anxious', 'calm'];
  selectedMood = '';
  isDarkMode = false;

  

  changeTheme(mood: string) {
    this.selectedMood = mood;
  }

  getMoodIcon(mood: string): string {
    return `/assets/icons/${mood}.png`;
  }

  getChibiName(mood: string): string {
    const names: { [key: string]: string } = {
      happy: 'Lumi',
      sad: 'Droo',
      angry: 'Blaze',
      anxious: 'Whisp',
      calm: 'Sora'
    };
    return names[mood] || 'Unknown';
  }

  getChibiStory(mood: string): string {
    const stories: { [key: string]: string } = {
      happy: 'Lumi shows you the light in endings;the laughs, the good times, the memories that still make you smile. Even when things fall apart, she reminds you that joy existed, and that’s something worth holding onto.',
      sad: 'Droo helps you sit with your sadness. She understands how heavy goodbyes can feel and gives you the space to grieve, reminding you that feeling pain is a natural part of letting go.',
      angry: 'Blaze burns with the fire of frustration and hurt. He pushes you to speak up, set boundaries, and stand tall. With him, you learn that anger isn’t bad it’s the first step toward reclaiming your power.',
      anxious: 'Whisp holds your worries about the future. She may overthink, but she’s just trying to protect you. She gently reminds you to breathe and trust yourself.',
      calm: 'Sora brings peace after the storm. He helps you accept what’s happened and let go of what you can’t control. With Sora, you find stillness and the strength to begin again.'
    };
    return stories[mood] || 'This chibi has a unique story to share with you.';
  }
}
