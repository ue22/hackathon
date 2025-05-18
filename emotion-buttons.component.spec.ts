import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionButtonsComponent } from './emotion-buttons.component';

describe('EmotionButtonsComponent', () => {
  let component: EmotionButtonsComponent;
  let fixture: ComponentFixture<EmotionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmotionButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmotionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
