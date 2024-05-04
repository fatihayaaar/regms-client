import {Component, Inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from "./services/auth.service";
import {ThemeService} from "./services/theme.service";
import {HeaderComponent} from "./components/header/header.component";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent {
    title = 'regms';

    constructor(private authService: AuthService, themeService: ThemeService, @Inject(DOCUMENT) private document: Document) {
        document.body.setAttribute('data-theme', themeService.getIsDarkTheme() ? "dark" : "light");
        document.body.style.backgroundColor = 'var(--background-color)';
    }

    public isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }
}
