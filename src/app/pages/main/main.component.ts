import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  isDarkMode = false;

  @HostBinding('class.dark-mode') get darkMode() {
    return this.isDarkMode;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  changeTheme(mood: string) {
    console.log('Changing theme to:', mood);
    // You can expand this to change styles dynamically based on mood
  }
}
