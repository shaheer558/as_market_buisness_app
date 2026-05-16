import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTreasure } from './app-treasure';

describe('AppTreasure', () => {
  let component: AppTreasure;
  let fixture: ComponentFixture<AppTreasure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppTreasure],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTreasure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
