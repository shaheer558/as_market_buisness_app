import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerStop } from './customer-stop';

describe('CustomerStop', () => {
  let component: CustomerStop;
  let fixture: ComponentFixture<CustomerStop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerStop],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerStop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
