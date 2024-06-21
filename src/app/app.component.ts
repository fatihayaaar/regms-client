import {Component, Inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ThemeService} from "./core/services/theme.service";
import {DOCUMENT} from "@angular/common";
import {AuthService} from "./core/services/auth.service";
import {HeaderComponent} from "./product/components/header/header.component";
import {SplashComponent} from "./product/pages/splash/splash.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, SplashComponent],
})
export class AppComponent implements OnInit {
    title = 'regms';

    constructor(protected themeService: ThemeService, @Inject(DOCUMENT) protected document: Document, private authService: AuthService) {
        document.body.setAttribute('data-theme', themeService.getIsDarkTheme() ? "dark" : "light");
        document.body.style.backgroundColor = 'var(--background-color)';
    }

    ngOnInit() {
    }

    public isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    protected readonly AuthService = AuthService;
}