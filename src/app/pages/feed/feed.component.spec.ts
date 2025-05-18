import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedComponent } from './feed.component';
import { By } from '@angular/platform-browser';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the feed component', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct number of recent entries', () => {
    const entries = fixture.debugElement.queryAll(By.css('.recent-entries .entry-card'));
    expect(entries.length).toBe(component.recentEntries.length);
  });

  it('should display correct number of hall of fame entries', () => {
    const fameEntries = fixture.debugElement.queryAll(By.css('.hall-of-fame .entry-card.fame'));
    expect(fameEntries.length).toBe(component.hallOfFameEntries.length);
  });
});
