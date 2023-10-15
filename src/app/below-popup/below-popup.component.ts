import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-below-popup',
  templateUrl: './below-popup.component.html',
  styleUrls: ['./below-popup.component.css'],
})
export class BelowPopupComponent implements OnChanges {
  constructor() {}
  @Input() selectedCountInputTask: number = 0;
  @Input() selectedCountTask: number = 0;

  @Output() updateParentSelected = new EventEmitter<boolean>();

  selectedCount: number = 0;
  predictedCount: number = 0;

  isActionSelectorVisible: boolean = false;

  updateParentSelectedStatus(status: boolean) {
    this.updateParentSelected.emit(status);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedCountInputTask' in changes || 'selectedCountTask' in changes) {
      this.calculateCounts();
    }
  }

  calculateCounts(): void {
    if (this.selectedCountInputTask > 1 && this.selectedCountTask > 1) {
      this.selectedCount = 4;
      this.predictedCount =
        this.selectedCountInputTask + this.selectedCountTask - 4;
    } else if (this.selectedCountInputTask > 1) {
      this.selectedCount =
        this.selectedCountTask === 1 ? this.selectedCountTask + 2 : 2;
      this.predictedCount = this.selectedCountInputTask - 2;
    } else if (this.selectedCountTask > 1) {
      this.selectedCount =
        this.selectedCountInputTask === 1 ? this.selectedCountInputTask + 2 : 2;
      this.predictedCount = this.selectedCountTask - 2;
    } else if (
      this.selectedCountInputTask === 1 &&
      this.selectedCountTask === 1
    ) {
      this.selectedCount = 2;
      this.predictedCount = 0;
    } else if (
      this.selectedCountInputTask === 1 ||
      this.selectedCountTask === 1
    ) {
      this.selectedCount = this.selectedCountInputTask + this.selectedCountTask;
      this.predictedCount = 0;
    } else {
      this.selectedCount = 0;
      this.predictedCount = 0;
    }
  }

  toggleActionSelector() {
    this.isActionSelectorVisible = !this.isActionSelectorVisible;
  }

  reset(): void {
    console.log('Reset button clicked');
    this.updateParentSelectedStatus(false);
  }

  save() {
    this.isActionSelectorVisible = true;
    this.updateParentSelectedStatus(true);
  }
}
