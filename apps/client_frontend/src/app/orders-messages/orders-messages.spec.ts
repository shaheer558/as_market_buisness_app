import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersMessages } from './orders-messages';

describe('OrdersMessages', () => {
  let component: OrdersMessages;
  let fixture: ComponentFixture<OrdersMessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersMessages],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersMessages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
