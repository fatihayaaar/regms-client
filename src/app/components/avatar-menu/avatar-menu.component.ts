import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrl: './avatar-menu.component.scss',
  standalone: true,
})
export class AvatarMenuComponent {

  isThemeChecked: boolean = true;

  constructor(private themeService: ThemeService) {
    this.isThemeChecked = themeService.getIsDarkTheme();
  }

  toggleTheme() {
    this.isThemeChecked = !this.isThemeChecked;
    this.themeService.toggleTheme();
  }
}
