import {Component, HostListener, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgStyle} from "@angular/common";

@Component({
    selector: 'app-media-dialog',
    templateUrl: './media-dialog.component.html',
    styleUrl: './media-dialog.component.scss',
    standalone: true,
    imports: [NgStyle]
})
export class MediaDialogComponent {

    constructor(public dialogRef: MatDialogRef<MediaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    }

    closeDialog() {
        this.dialogRef.close('');
    }

    @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            this.dialogRef.close();
        }
    }
}
