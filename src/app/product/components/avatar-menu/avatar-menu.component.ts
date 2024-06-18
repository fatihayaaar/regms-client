import { Component } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {ThemeService} from "../../../core/services/theme.service";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-avatar-menu',
    templateUrl: './avatar-menu.component.html',
    styleUrl: './avatar-menu.component.scss',
    standalone: true,
    imports: [
        RouterLink
    ]
})
export class AvatarMenuComponent {

  isThemeChecked: boolean = true;

  constructor(private themeService: ThemeService, private authService: AuthService) {
    this.isThemeChecked = themeService.getIsDarkTheme();
  }

  toggleTheme() {
    this.isThemeChecked = !this.isThemeChecked;
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
  }
}
