import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceUpdateApprovals } from './price-update-approvals';

describe('PriceUpdateApprovals', () => {
  let component: PriceUpdateApprovals;
  let fixture: ComponentFixture<PriceUpdateApprovals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceUpdateApprovals],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceUpdateApprovals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
