import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningpageComponent } from './warningpage.component';

describe('WarningpageComponent', () => {
  let component: WarningpageComponent;
  let fixture: ComponentFixture<WarningpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarningpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
