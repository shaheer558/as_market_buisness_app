import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviationProof } from './deviation-proof';

describe('DeviationProof', () => {
  let component: DeviationProof;
  let fixture: ComponentFixture<DeviationProof>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviationProof],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviationProof);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
