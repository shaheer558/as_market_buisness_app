import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReturnRoute } from './return-route';

describe('ReturnRoute', () => {
  let component: ReturnRoute;
  let fixture: ComponentFixture<ReturnRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnRoute],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnRoute);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
