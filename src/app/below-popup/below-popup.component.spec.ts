import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelowPopupComponent } from './below-popup.component';

describe('BelowPopupComponent', () => {
  let component: BelowPopupComponent;
  let fixture: ComponentFixture<BelowPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BelowPopupComponent]
    });
    fixture = TestBed.createComponent(BelowPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
