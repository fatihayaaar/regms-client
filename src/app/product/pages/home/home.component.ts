import {Component} from '@angular/core';
import {Post} from "../../models/post.model";
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    ClickableListComponent,
    FooterComponent,
    PostComponent,
    TrendsListComponent
  ]
})
export class HomeComponent {

  posts: Post[] = [
    {
      username: "fayar",
      avatarUrl: "",
      mediasUrl: [],
      content: "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
      likesCount: 0,
      commentCount: 0,
    },
    {
      username: 'kullanici2',
      avatarUrl: "",
      mediasUrl: ["assets/images/temp-photo2.jpg"],
      content: 'So, I’ve been using CapCut to make edits with scenes from my favorite movies in alignment with a favorite song I like to post on Instagram and YouTube But my question is how can I use songs without worrying about copyright issues For example, if I would like to use…say…Justin Timberlake’s \'Drown.\'',
      likesCount: 20,
      commentCount: 15
    },
    {
      username: 'kullanici2',
      avatarUrl: "",
      mediasUrl: ["assets/images/temp-photo.jpg"],
      content: 'So, I’ve been using CapCut to make edits with scenes from my favorite movies in alignment with a favorite song I like to post on Instagram and YouTube But my question is how can I use songs without worrying about copyright issues For example, if I would like to use…say…Justin Timberlake’s \'Drown.\'',
      likesCount: 20,
      commentCount: 15
    },
    {
      username: 'kullanici2',
      avatarUrl: "",
      mediasUrl: [],
      content: 'So, I’ve been using CapCut to make edits with scenes from my favorite movies in alignment with a favorite song I like to post on Instagram and YouTube But my question is how can I use songs without worrying about copyright issues For example, if I would like to use…say…Justin Timberlake’s \'Drown.\'',
      likesCount: 20,
      commentCount: 15
    },    {
      username: 'kullanici2',
      avatarUrl: "",
      mediasUrl: [],
      content: 'So, I’ve been using CapCut to make edits with scenes from my favorite movies in alignment with a favorite song I like to post on Instagram and YouTube But my question is how can I use songs without worrying about copyright issues For example, if I would like to use…say…Justin Timberlake’s \'Drown.\'',
      likesCount: 20,
      commentCount: 15
    },
  ];
}
