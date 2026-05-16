import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtraBudgetAllocation } from './extra-budget-allocation';

describe('ExtraBudgetAllocation', () => {
  let component: ExtraBudgetAllocation;
  let fixture: ComponentFixture<ExtraBudgetAllocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtraBudgetAllocation],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraBudgetAllocation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
