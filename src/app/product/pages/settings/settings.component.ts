import {Component} from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
  imports: [
    ClickableListComponent,
    FooterComponent,
    PostComponent,
    TrendsListComponent
  ]
})
export class SettingsComponent {
}
