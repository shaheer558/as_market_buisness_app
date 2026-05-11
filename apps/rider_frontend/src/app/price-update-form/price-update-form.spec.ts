import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceUpdateForm } from './price-update-form';

describe('PriceUpdateForm', () => {
  let component: PriceUpdateForm;
  let fixture: ComponentFixture<PriceUpdateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceUpdateForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceUpdateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
