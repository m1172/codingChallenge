import { Component, Output, EventEmitter } from '@angular/core';
import {
  faMousePointer as faClick,
  faKeyboard as faText,
  faDatabase,
  faArrowRight,
  faSearch,
  faSync,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-action-selector',
  templateUrl: './action-selector.component.html',
  styleUrls: ['./action-selector.component.css'],
})
export class ActionSelectorComponent {
  faClick = faClick;
  faText = faText;
  faDatabase = faDatabase;
  faArrowRight = faArrowRight;
  faSearch = faSearch;
  faSync = faSync;

  @Output() closeEvent: EventEmitter<void> = new EventEmitter<void>();

  closeActionSelector() {
    this.closeEvent.emit();
  }
}
