import {Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appAutoResizeInput]'
})
export class AutoResizeInputDirective implements OnChanges {
    @Input('firstLength') firstLength: number | undefined = 0;

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
        if (valueLength < 3) {
            inputElement.style.width = 5 + 'ch';
        } else {
            inputElement.style.width = valueLength + 2 + 'ch';
        }
    }
}