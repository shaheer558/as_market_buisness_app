import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopStop } from './shop-stop';

describe('ShopStop', () => {
  let component: ShopStop;
  let fixture: ComponentFixture<ShopStop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopStop],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopStop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
