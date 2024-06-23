import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AvatarComponent} from "../avatar/avatar.component";
import {AvatarMenuComponent} from "../avatar-menu/avatar-menu.component";
import {DOCUMENT} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {UploadDialogComponent} from "../upload-dialog/upload-dialog.component";
import {ThemeService} from "../../../core/services/theme.service";
import {ProfileService} from "../../services/profile.service";
import {ProfileStore} from "../../stores/profile.store";

declare var bootstrap: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [AvatarComponent, AvatarMenuComponent, RouterLink,],
})
export class HeaderComponent implements OnInit {

    isDropdownOpen: boolean = false;
    timeoutId: any;
    logoPath: string = "";
    fullname: string = "";
    username: string = "";
    jpegPhoto?: string;

    constructor(
        private router: Router,
        private themeService: ThemeService,
        private profileStore: ProfileStore,
        @Inject(DOCUMENT) private document: Document,
        private dialog: MatDialog,
    ) {}

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

        this.jpegPhoto = this.profileStore.getAvatar();
    }

    toggleDropdown(status: boolean) {
        this.isDropdownOpen = status;
        clearTimeout(this.timeoutId);
    }

    closeDropdown() {
        this.timeoutId = setTimeout(() => {
            this.isDropdownOpen = false;
        }, 750);
    }

    uploadButtonClick() {
        this.dialog.open(UploadDialogComponent, {});
    }
}
