import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveTripMap } from './activeTripMap';

describe('ActiveTripMap', () => {
  let component: ActiveTripMap;
  let fixture: ComponentFixture<ActiveTripMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveTripMap],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveTripMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
