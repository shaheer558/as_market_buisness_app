import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetsPlans } from './budgets-plans';

describe('BudgetsPlans', () => {
  let component: BudgetsPlans;
  let fixture: ComponentFixture<BudgetsPlans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetsPlans],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetsPlans);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
