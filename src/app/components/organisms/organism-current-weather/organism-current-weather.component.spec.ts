import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganismCurrentWeatherComponent } from './organism-current-weather.component';

describe('OrganismCurrentWeatherComponent', () => {
  let component: OrganismCurrentWeatherComponent;
  let fixture: ComponentFixture<OrganismCurrentWeatherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OrganismCurrentWeatherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganismCurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
