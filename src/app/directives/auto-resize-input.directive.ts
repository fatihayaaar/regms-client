import {Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appAutoResizeInput]'
})
export class AutoResizeInputDirective implements OnChanges {
    @Input('firstLength') firstLength= 0;

    constructor(private el: ElementRef) {}

    ngOnChanges(changes: SimpleChanges) {
        this.adjustWidth();
    }

    @HostListener('input') onInput() {
        this.adjustWidth();
    }

    adjustWidth() {
        const inputElement = this.el.nativeElement;
        const valueLength = this.firstLength ? this.firstLength : 0;
        inputElement.style.width = valueLength > 0 ? `${valueLength}ch` : this.firstLength + 'ch';
    }
}