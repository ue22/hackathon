import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarewellJournalComponent } from './farewell-journal.component';

describe('FarewellJournalComponent', () => {
  let component: FarewellJournalComponent;
  let fixture: ComponentFixture<FarewellJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarewellJournalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FarewellJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with joy theme', () => {
    expect(component.currentThemeKey).toBe('joy');
    expect(component.currentTheme.name).toBe('Joy');
  });

  it('should change theme to sadness', () => {
    component.setTheme('sadness');
    expect(component.currentThemeKey).toBe('sadness');
    expect(component.currentTheme.name).toBe('Sadness');
  });

  it('should toggle music on and off', () => {
    const mockAudio = {
      src: '',
      loop: false,
      play: jasmine.createSpy('play'),
      pause: jasmine.createSpy('pause')
    } as unknown as HTMLAudioElement;

    component.audio = mockAudio;
    component.currentTheme.music = 'assets/music/happy.mp3';

    component.toggleMusic(); // Should play
    expect(mockAudio.play).toHaveBeenCalled();
    expect(component.isMusicPlaying).toBeTrue();

    component.toggleMusic(); // Should pause
    expect(mockAudio.pause).toHaveBeenCalled();
    expect(component.isMusicPlaying).toBeFalse();
  });

  it('should stop music', () => {
    const mockAudio = {
      pause: jasmine.createSpy('pause')
    } as unknown as HTMLAudioElement;

    component.audio = mockAudio;
    component.isMusicPlaying = true;

    component.stopMusic();
    expect(mockAudio.pause).toHaveBeenCalled();
    expect(component.isMusicPlaying).toBeFalse();
  });

  it('should return correct button classes for active theme', () => {
    component.setTheme('rage');
    const classes = component.getButtonClasses('rage');
    expect(classes).toContain('active');
    expect(classes).toContain('bg-red-300');
  });

  it('should return correct icon classes', () => {
    const iconClass = component.getIconClasses('peace');
    expect(iconClass).toContain('text-green-700');
    expect(iconClass).toContain('fa-peace');
  });
});
