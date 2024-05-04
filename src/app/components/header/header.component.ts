import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ThemeService} from "../../services/theme.service";
import {AvatarComponent} from "../avatar/avatar.component";
import {AvatarMenuComponent} from "../avatar-menu/avatar-menu.component";
import {DOCUMENT} from "@angular/common";

declare var bootstrap: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [AvatarComponent, AvatarMenuComponent,]
})
export class HeaderComponent implements OnInit {

    isDropdownOpen: boolean = false;
    timeoutId: any;
    logoPath: string = "";
    fullname: string = "";
    username: string = "";

    constructor(private router: Router, private themeService: ThemeService, @Inject(DOCUMENT) private document: Document) {
    }

    ngOnInit(): void {
        (() => {
            'use strict'
            const tooltipTriggerList = Array.from(this.document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            tooltipTriggerList.forEach(tooltipTriggerEl => {
                new bootstrap.Tooltip(tooltipTriggerEl)
            })
        })();
        this.username = "Username";

        this.logoPath = this.themeService.getLogoPath();
        this.themeService.isDarkTheme.subscribe(isDark => {
            this.logoPath = this.themeService.getLogoPath();
        });
    }


    toggleDropdown(status: boolean) {
        this.isDropdownOpen = status;
        clearTimeout(this.timeoutId);
    }

    closeDropdown() {
        this.timeoutId = setTimeout(() => {
            this.isDropdownOpen = false;
        }, 1000);
    }

    logout() {
    }
}
