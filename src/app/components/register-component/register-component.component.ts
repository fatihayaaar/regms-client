import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.scss',
  standalone: true,
  imports: [
    FormsModule
  ]
})
export class RegisterComponentComponent {

  @Output() mode = new EventEmitter<string>();
  username: string = "";
  password: string = "";

  constructor() {}

  register(username: string, password: string) {
  }

  loginModeClick() {
    this.mode.emit("login");
  }
}
