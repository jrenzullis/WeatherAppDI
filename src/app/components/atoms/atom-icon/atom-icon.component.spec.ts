import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AtomIconComponent } from './atom-icon.component';

describe('AtomIconComponent', () => {
  let component: AtomIconComponent;
  let fixture: ComponentFixture<AtomIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AtomIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtomIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
