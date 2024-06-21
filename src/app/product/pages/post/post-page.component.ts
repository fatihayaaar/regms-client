import {Component} from '@angular/core';
import {Post} from "../../models/post.model";
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";

@Component({
  selector: 'post',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
  standalone: true,
  imports: [
    ClickableListComponent,
    FooterComponent,
    PostComponent,
    TrendsListComponent
  ]
})
export class PostPageComponent {

  post: Post = {text: "test"};
}
