import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentReport } from './incident-report';

describe('IncidentReport', () => {
  let component: IncidentReport;
  let fixture: ComponentFixture<IncidentReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentReport],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
