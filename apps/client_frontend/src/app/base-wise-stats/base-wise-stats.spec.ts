import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseWiseStats } from './base-wise-stats';

describe('BaseWiseStats', () => {
  let component: BaseWiseStats;
  let fixture: ComponentFixture<BaseWiseStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseWiseStats],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseWiseStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
