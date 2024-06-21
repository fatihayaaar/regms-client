import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../../core/services/theme.service";

@Component({
  selector: 'splash',
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss',
  standalone: true,
  imports: [
  ]
})
export class SplashComponent implements OnInit {
  logoPath: string = "";

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.logoPath = this.themeService.getLogoPath();
    this.themeService.isDarkTheme.subscribe(isDark => {
      this.logoPath = this.themeService.getLogoPath();
    });
  }

}
