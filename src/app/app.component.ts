import {Component, Inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
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

    constructor(protected themeService: ThemeService, @Inject(DOCUMENT) protected document: Document) {
        document.body.setAttribute('data-theme', themeService.getIsDarkTheme() ? "dark" : "light");
        document.body.style.backgroundColor = 'var(--background-color)';
    }

    login(): void {
    }

    public isLoggedIn(): boolean {
        return true;
    }
}
