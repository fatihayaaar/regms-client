import {Component} from '@angular/core';
import {Post} from "../../models/post.model";
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";
import {ProfileCardComponent} from "../../components/profile-card/profile-card.component";
import {PostSendBoxComponent} from "../../components/post-send-box/post-send-box.component";

@Component({
  selector: 'register',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true,
    imports: [
        ClickableListComponent,
        FooterComponent,
        PostComponent,
        TrendsListComponent,
        ProfileCardComponent,
        PostSendBoxComponent
    ]
})
export class ProfileComponent {

  posts: Post[] = [
  ]
}
