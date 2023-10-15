import { Component, Output, EventEmitter } from '@angular/core';
import {
  faMousePointer as faClick,
  faKeyboard as faText,
  faDatabase,
  faArrowRight,
  faSearch,
  faSync,
} from '@fortawesome/free-solid-svg-icons';
import { RunBotService } from 'src/app/run-bot.service';

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

  constructor(private runBotService: RunBotService) {}

  onRunBotClick() {
    this.runBotService.triggerRunBot();
  }

  closeActionSelector() {
    this.closeEvent.emit();
  }
}
