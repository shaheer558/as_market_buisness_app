import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPreview } from './orderPreview';

describe('OrderPreview', () => {
  let component: OrderPreview;
  let fixture: ComponentFixture<OrderPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
