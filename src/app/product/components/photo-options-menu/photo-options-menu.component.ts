import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ClickOutsideDirective} from "../../../core/directives/click-outside.directive";

@Component({
    selector: 'app-photo-options-menu',
    templateUrl: './photo-options-menu.component.html',
    styleUrls: ['./photo-options-menu.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective]
})
export class DropdownMenuComponent {

    @Input() isProfilePhoto: any;
    @Output() imageChanged = new EventEmitter<any>();
    @ViewChild('menu') menu: ElementRef | undefined;

    constructor() {
    }

    openToggleMenu() {
        const menu = this.menu!.nativeElement;
        if (menu) {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        }
    }

    closeMenu() {
        const menuElement = this.menu!.nativeElement;
        menuElement.style.display = 'none';
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imageChanged.emit(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        this.openToggleMenu();
        event.target.value = '';
    }

    removePhoto() {
        this.imageChanged.emit(this.isProfilePhoto ? 'assets/images/avatar/profile.png' : null);
    }
}
