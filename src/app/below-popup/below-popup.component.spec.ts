import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BelowPopupComponent } from './below-popup.component';
import { Component, EventEmitter, Output } from '@angular/core';

// Mock Child Component
@Component({
  selector: 'app-action-selector',
  template: '',
})
class MockActionSelectorComponent {
  @Output() closeEvent: EventEmitter<void> = new EventEmitter<void>();
}

describe('BelowPopupComponent', () => {
  let component: BelowPopupComponent;
  let fixture: ComponentFixture<BelowPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BelowPopupComponent, MockActionSelectorComponent],
    });

    fixture = TestBed.createComponent(BelowPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
