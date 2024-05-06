import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {FooterComponent} from "../../components/footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-register-page',
  templateUrl: './app-register-page.component.html',
  styleUrl: './app-register-page.component.scss',
  standalone: true,
    imports: [
        FooterComponent,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppRegisterPageComponent {
  logoPath: string = "";
  username: string = "";
  password: string = "";

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.logoPath = this.themeService.getLogoPath();
    this.themeService.isDarkTheme.subscribe(isDark => {
      this.logoPath = this.themeService.getLogoPath();
    });
  }

  register(username: string, password: string) {
  }
}
