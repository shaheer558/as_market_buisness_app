import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LegalAgreements } from './legal-agreements';

describe('LegalAgreements', () => {
  let component: LegalAgreements;
  let fixture: ComponentFixture<LegalAgreements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalAgreements],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalAgreements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
