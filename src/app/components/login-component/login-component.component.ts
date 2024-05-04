import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss',
  standalone: true,
  imports: [
    FormsModule
  ]
})
export class LoginComponentComponent {

  @Output() mode = new EventEmitter<string>();
  username: string = "";
  password: string = "";

  constructor() {}

  login(username: string, password: string) {
  }

  registerModeClick() {
    this.mode.emit("register");
  }
}
