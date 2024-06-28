import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AvatarComponent} from "../avatar/avatar.component";
import {AvatarMenuComponent} from "../avatar-menu/avatar-menu.component";
import {DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {UploadDialogComponent} from "../upload-dialog/upload-dialog.component";
import {ThemeService} from "../../../core/services/theme.service";
import {ProfileStore} from "../../stores/profile.store";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";

declare var bootstrap: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [AvatarComponent, AvatarMenuComponent, RouterLink, FormsModule, NgIf, NgForOf,],
})
export class HeaderComponent implements OnInit {

    @ViewChild('searchInput') searchInput: ElementRef | undefined;
    isDropdownOpen: boolean = false;
    timeoutId: any;
    logoPath: string = "";
    fullname: string = "";
    username: string = "";
    avatar?: string = "";
    showList: boolean = false;
    userList: User[] = [];

    constructor(
        private router: Router,
        private themeService: ThemeService,
        private profileStore: ProfileStore,
        private userService: UserService,
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

        this.profileStore.profile$.subscribe(profile => {
            this.avatar = profile?.avatar;
        });
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

    selectSearchResult(data: User) {
        this.router.navigate(['/profile'], {
            queryParams: {
                isMyProfile: false,
                username: data.uid,
            }
        });
        this.searchInput!.nativeElement.value = '';
    }

    hideList() {
        setTimeout(() => {
            this.showList = false;
        }, 200);
    }

    onTextChange() {
        const inputValue = this.searchInput!.nativeElement.value;
        if (inputValue == null || inputValue.length < 2) {
            this.showList = false;
            return;
        }
        this.showList = true;

        this.userService.search(inputValue, (response) => {
            this.userList = response;
        });
    }
}
