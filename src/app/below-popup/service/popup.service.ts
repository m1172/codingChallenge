import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  _selectedElements = new BehaviorSubject<ElementRef[]>([]);
  public readonly selectedElements$ = this._selectedElements.asObservable();

  get selectedElements(): ElementRef[] {
    return this._selectedElements.getValue();
  }

  addElement(el: ElementRef) {
    this._selectedElements.next([...this.selectedElements, el]);
  }

  removeElement(el: ElementRef) {
    this._selectedElements.next(this.selectedElements.filter((e) => e !== el));
  }

  clearAll() {
    this._selectedElements.next([]);
  }
}
