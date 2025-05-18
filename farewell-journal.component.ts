import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-farewell-journal',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './farewell-journal.component.html',
  styleUrls: ['./farewell-journal.component.css']
})

export class FarewellJournalComponent implements OnInit {
@ViewChild('textArea', { static: false }) textAreaRef!: ElementRef<HTMLTextAreaElement>;

  Math = Math;
  isBrowser: boolean;

  audio: HTMLAudioElement | null = typeof Audio !== 'undefined' ? new Audio() : null;
  isMusicPlaying = false;

  dropStyles: Array<{ left: string; duration: string; delay: string }> = [];
  starStyles: Array<{ top: string; left: string; delay: string }> = [];
  fireStyles: Array<{ left: string; duration: string; delay: string }> = [];
  leafStyles: Array<{ left: string; duration: string; delay: string }> = [];

  emojis = ['😊', '😂', '❤️', '😢', '😡', '🎉', '🌟', '😎', '🥺', '💔', '🙏', '🌈'];
  showEmojiPicker = false;

  uploadedImageUrl: string | null = null; // ✅ Fix: declare the property

  themes: Record<string, Theme> = {
    joy: {
      name: 'Joy',
      title: 'The Happy Farewell',
      bgClass: 'bg-yellow-400',
      icon: 'assets/icons/happy.png',
      iconColor: '',
      bgColor: 'bg-yellow-400',
      color: 'text-yellow-200',
      effects: 'sparkle',
      music: '/assets/music/happy.mp3'
    },
    sadness: {
      name: 'Sadness',
      title: 'The Tearful Goodbye',
      bgClass: 'bg-blue-700',
      icon: 'assets/icons/sad.png',
      iconColor: '',
      bgColor: 'bg-blue-700',
      color: 'text-blue-100',
      effects: 'rain',
      music: '/assets/music/sad.mp3'
    },
    rage: {
      name: 'Rage',
      title: 'The Fiery Exit',
      bgClass: 'bg-red-700',
      icon: '/assets/icons/angry.png',
      iconColor: '',
      bgColor: 'bg-red-700',
      color: 'text-red-100',
      effects: 'fire',
      music: '/assets/music/intense.mp3'
    },
    fear: {
      name: 'Fear',
      title: 'The Anxious Departure',
      bgClass: 'bg-purple-800',
      icon: 'assets/icons/anxious.png',
      iconColor: '',
      bgColor: 'bg-purple-800',
      color: 'text-purple-200',
      effects: 'anxious',
      music: '/assets/music/mysterious.mp3'
    },
    peace: {
      name: 'Peace',
      title: 'The Serene Farewell',
      bgClass: 'bg-green-600',
      icon: 'assets/icons/calm.png',
      iconColor: '',
      bgColor: 'bg-green-600',
      color: 'text-green-100',
      effects: 'leaves',
      music: '/assets/music/calm.mp3'
    }
  };

  themeKeys = Object.keys(this.themes);
  currentThemeKey = 'joy';
  currentTheme = this.themes['joy'];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.generateRainDrops();
    this.generateSparkles();
    this.generateFire();
    this.generateLeaves();
    this.setTheme(this.currentThemeKey);

    if (this.isBrowser) {
      (window as any).setTheme = (k: string) => this.setTheme(k);
    }
  }

private effectElements = {
  rain: () => document.getElementById('rain'),
  sparkle: () => document.getElementById('sparkle'),
  fire: () => document.getElementById('fire'),
  leaves: () => document.getElementById('leaves'),
  anxious: () => document.getElementById('anxious'),
};

setTheme(key: string): void {
  this.currentThemeKey = key;
  this.currentTheme = this.themes[key];

  if (this.isBrowser) {
    // Hide all effects
    Object.values(this.effectElements).forEach(getEl => getEl()?.classList.add('hidden'));
    // Show current effect
    if (this.currentTheme.effects) {
      this.effectElements[this.currentTheme.effects]?.()?.classList.remove('hidden');
    }
  }

  // Stop any playing music first
  this.stopMusic();

  // Set and play new theme music automatically
  if (this.isBrowser && this.audio) {
    this.audio.src = this.currentTheme.music;
    this.audio.loop = true;
    this.audio.play().then(() => {
      this.isMusicPlaying = true;
      this.cdr.detectChanges();
    }).catch((err) => {
      // Handle play failure (e.g., autoplay blocked)
      this.isMusicPlaying = false;
      console.warn('Audio play was prevented:', err);
    });
  }

  this.cdr.detectChanges();
}



toggleMusic(): void {
  if (!this.isBrowser || !this.audio) return;

  // If audio src is not set or different from current theme music, set it
  if (!this.audio.src || this.audio.src !== this.currentTheme.music) {
    this.audio.src = this.currentTheme.music;
    this.audio.loop = true;
  }

  if (this.isMusicPlaying) {
    this.audio.pause();
    this.isMusicPlaying = false;
  } else {
    this.audio.play().then(() => {
      this.isMusicPlaying = true;
    }).catch(err => {
      console.warn('Audio play was prevented:', err);
      this.isMusicPlaying = false;
    });
  }

  this.cdr.detectChanges();
}


  stopMusic(): void {
    if (this.isBrowser && this.audio) {
      this.audio.pause();
      this.isMusicPlaying = false;
    }
  }

  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  insertEmoji(emoji: string): void {
    const textArea = this.textAreaRef?.nativeElement;
    if (textArea) {
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      const text = textArea.value;
      textArea.value = text.slice(0, start) + emoji + text.slice(end);
      textArea.selectionStart = textArea.selectionEnd = start + emoji.length;
      textArea.focus();
    }
    this.showEmojiPicker = false;
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      console.log('Uploaded image:', file.name);
      this.previewImage(file); // ✅ show preview
    }
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      console.log('Dropped file:', file.name);
      this.previewImage(file); // ✅ show preview
    }
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImageUrl = reader.result as string;
      this.cdr.detectChanges(); // trigger change detection to update view
    };
    reader.readAsDataURL(file);
  }

  private generateRainDrops(count = 100): void {
    this.dropStyles = Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 2 + 1}s`,
      delay: `${Math.random() * 2}s`
    }));
  }

  private generateSparkles(count = 300): void {
    this.starStyles = Array.from({ length: count }, () => ({
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`
    }));
  }

  private generateFire(count = 100): void {
    this.fireStyles = Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 2 + 1}s`,
      delay: `${Math.random() * 2}s`
    }));
  }

  private generateLeaves(count = 100): void {
    this.leafStyles = Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 3}s`
    }));
  }

  getButtonClasses(themeKey: string): string[] {
    const active = this.currentThemeKey === themeKey ? 'active' : '';
    return [active, this.themes[themeKey]?.bgColor || ''];
  }

  getIconClasses(themeKey: string): string {
    const theme = this.themes[themeKey];
    return `${theme.iconColor} ${theme.icon}`;
  }
}

interface Theme {
  name: string;
  title: string;
  bgClass: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  color: string;
  effects: 'rain' | 'sparkle' | 'fire' | 'leaves' | 'anxious' | null;
  music: string;
}
