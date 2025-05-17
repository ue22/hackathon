import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  

  it('should change theme based on mood', () => {
  component.changeTheme('anxious');
  expect(component.selectedMood).toBe('anxious');
});

  it('should return correct icon path', () => {
    const path = component.getMoodIcon('happy');
    expect(path).toContain('happy.png');
  });
});
