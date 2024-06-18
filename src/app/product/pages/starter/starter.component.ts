import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ThemeService} from "../../../core/services/theme.service";
import {RegisterService} from "../../services/register.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'home',
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.scss',
  standalone: true,
  imports: [
    ClickableListComponent,
    FooterComponent,
    PostComponent,
    TrendsListComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class StarterComponent implements OnInit {
  logoPath: string = "";
  fullname: string = "";

  constructor(private themeService: ThemeService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.logoPath = this.themeService.getLogoPath();
    this.themeService.isDarkTheme.subscribe(isDark => {
      this.logoPath = this.themeService.getLogoPath();
    });
    this.route.queryParams.subscribe(params => {
      this.fullname = this.capitalizeFirstLetter(params['key']);
    });
  }

  goToPage() {
    this.router.navigate(['/home']);
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
  }
}
