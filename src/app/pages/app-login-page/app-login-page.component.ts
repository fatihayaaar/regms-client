import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {LoginComponentComponent} from "../../components/login-component/login-component.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {RegisterComponentComponent} from "../../components/register-component/register-component.component";

@Component({
  selector: 'app-login-page',
  templateUrl: './app-login-page.component.html',
  styleUrl: './app-login-page.component.scss',
  standalone: true,
  imports: [
    LoginComponentComponent,
    FooterComponent,
    RegisterComponentComponent
  ]
})
export class AppLoginPageComponent {

  logoPath: string = "";
  mode: string = "login";
  username: string = "";
  password: string = "";

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.logoPath = this.themeService.getLogoPath();
    this.themeService.isDarkTheme.subscribe(isDark => {
      this.logoPath = this.themeService.getLogoPath();
    });
  }

  receiveLoginMessage($event: any) {
    console.log($event);
    this.mode = $event;
  }

  receiveRegisterMessage($event: any) {
    console.log($event);
    this.mode = $event;
  }
}
