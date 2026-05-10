import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSequence } from './order-sequence';

describe('OrderSequence', () => {
  let component: OrderSequence;
  let fixture: ComponentFixture<OrderSequence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSequence],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSequence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
