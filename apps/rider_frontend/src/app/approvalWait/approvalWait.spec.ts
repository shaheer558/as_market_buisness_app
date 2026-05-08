import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovalWait } from './approvalWait';

describe('ApprovalWait', () => {
  let component: ApprovalWait;
  let fixture: ComponentFixture<ApprovalWait>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalWait],
    }).compileComponents();

    fixture = TestBed.createComponent(ApprovalWait);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
