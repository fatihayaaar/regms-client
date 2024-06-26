import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../../core/services/theme.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {NgIf} from "@angular/common";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {FooterComponent} from "../../components/footer/footer.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {RegisterService} from "../../services/register.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    RouterLinkActive
  ]
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  logoPath: string = "";

  constructor(private themeService: ThemeService, private registerService: RegisterService, private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.min(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.min(1)]],
      surname: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.logoPath = this.themeService.getLogoPath();
    this.themeService.isDarkTheme.subscribe(isDark => {
      this.logoPath = this.themeService.getLogoPath();
    });
  }

  register() {
    if (this.signUpForm!.valid) {
      const { username, email, password, name, surname } = this.signUpForm!.value;
      const user: User = <User>{
        uid: username,
        password: password,
        mail: email,
        name: name,
        surname: surname,
      };
      this.registerService.register(user).subscribe(
          response => {
            this.router.navigate(['/starter'], { queryParams: { key: name + " " + surname } });
          },
          error => {
            const config = new MatSnackBarConfig();
            config.duration = 5000;
            config.verticalPosition = 'top';
            this.snackBar.open(error.message, 'Close', config);
          }
      );
    } else {
      this.showValidationErrors();
    }
  }

  showValidationErrors() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    const controls = this.signUpForm.controls;
    if (controls["username"].invalid) {
      this.snackBar.open('Username is required and should be a valid email.', 'Close', config);
    }
    if (controls["email"].invalid) {
      this.snackBar.open('Email is required and should be a valid email.', 'Close', config);
    }
    if (controls["password"].invalid) {
      this.snackBar.open('Password is required and should be at least 6 characters long.', 'Close', config);
    }
  }
}