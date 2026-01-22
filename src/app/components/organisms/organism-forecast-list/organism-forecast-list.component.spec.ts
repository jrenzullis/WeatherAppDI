import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganismForecastListComponent } from './organism-forecast-list.component';

describe('OrganismForecastListComponent', () => {
  let component: OrganismForecastListComponent;
  let fixture: ComponentFixture<OrganismForecastListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OrganismForecastListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganismForecastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
