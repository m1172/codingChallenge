import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appSelectable]',
})
export class SelectableDirective {
  selectedElements: ElementRef[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  handleClick() {
    const alreadySelected = this.selectedElements.includes(this.el);

    if (alreadySelected) {
      this.deselectElement(this.el);
      this.selectedElements = this.selectedElements.filter(
        (e) => e !== this.el
      );
    } else {
      this.selectElement(this.el);
      this.selectedElements.push(this.el);
    }

    if (this.selectedElements.length >= 2) {
      this.predictAndHighlight();
      this.selectedElements.forEach((el) => this.deselectElement(el));
      this.selectedElements = [];
    }
  }

  selectElement(el: ElementRef) {
    this.renderer.setStyle(el.nativeElement, 'border', '2px solid #7BE78C');
  }

  deselectElement(el: ElementRef) {
    this.renderer.removeStyle(el.nativeElement, 'border');
  }

  predictAndHighlight() {
    const selectableElements = Array.from(
      document.querySelectorAll('[appSelectable]')
    );

    const currentIndices = this.selectedElements.map((el) =>
      selectableElements.indexOf(el.nativeElement)
    );

    if (currentIndices.length > 1) {
      const diff = currentIndices[1] - currentIndices[0];
      const predictedIndex = currentIndices[1] + diff;

      if (predictedIndex < selectableElements.length) {
        const predictedElement = selectableElements[predictedIndex];
        this.renderer.setStyle(predictedElement, 'border', '2px solid #2A25FF');
      }
    }
  }
}
