import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface JournalEntry {
  title: string;
  description: string;
  date: string;
  likes: number;
  loves: number;
  comments: number;
  totalReactions: number;
  commentList?: string[]; // Add for storing actual comments
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  recentEntries: JournalEntry[] = [];
  hallOfFameEntries: JournalEntry[] = [];
  newComment: { [title: string]: string } = {}; // Store new comments keyed by title

  ngOnInit() {
    this.recentEntries = [
      {
        title: 'jnu',
        description: 'jojjjjjjjjjjjjjjj',
        date: '18/05/2025',
        likes: 3,
        loves: 30,
        comments: 0,
        totalReactions: 33,
        commentList: []
      },
      {
        title: 'My First Journal Entry',
        description: 'Today was an amazing day! I learned so much about web development and built my first journal app.',
        date: '18/05/2025',
        likes: 6,
        loves: 4,
        comments: 2,
        totalReactions: 12,
        commentList: ['Great job!', 'Keep going!']
      },
      {
        title: 'Thoughts on Life',
        description: 'Sometimes we need to take a step back and appreciate the little things in life. The sunset today was breathtaking.',
        date: '17/05/2025',
        likes: 9,
        loves: 5,
        comments: 1,
        totalReactions: 15,
        commentList: ['Beautiful!']
      }
    ];

    this.updateHallOfFame();
  }

  addReaction(entry: JournalEntry, type: 'like' | 'love' | 'comment') {
    if (type === 'comment') {
      return; // Handled separately
    }

    if (type === 'like') {
      entry.likes++;
    } else if (type === 'love') {
      entry.loves++;
    }

    entry.totalReactions = entry.likes + entry.loves + entry.comments;
    this.updateHallOfFame();
  }

  postComment(entry: JournalEntry) {
    const comment = this.newComment[entry.title]?.trim();
    if (comment) {
      entry.commentList = entry.commentList || [];
      entry.commentList.push(comment);
      entry.comments++;
      entry.totalReactions = entry.likes + entry.loves + entry.comments;
      this.newComment[entry.title] = '';
      this.updateHallOfFame();
    }
  }

  updateHallOfFame() {
    const fameThreshold = 12;
    this.hallOfFameEntries = this.recentEntries.filter(entry => entry.totalReactions >= fameThreshold);
  }
}
