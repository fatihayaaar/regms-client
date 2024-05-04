import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  standalone: true,
})
export class DropdownMenuComponent {

  isOpen: boolean = false;
  selectedOption: string | undefined;
  options: string[] = ['Report'];

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }

  constructor() { }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!(event.target instanceof HTMLElement) || !event.target.closest('.dropdown')) {
      this.isOpen = false;
    }
  }
}
