import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoleculeWeatherCardComponent } from './molecule-weather-card.component';

describe('MoleculeWeatherCardComponent', () => {
  let component: MoleculeWeatherCardComponent;
  let fixture: ComponentFixture<MoleculeWeatherCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MoleculeWeatherCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoleculeWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
