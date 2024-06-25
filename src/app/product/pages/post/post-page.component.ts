import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";
import {AsyncPipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'post',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
  standalone: true,
  imports: [
    ClickableListComponent,
    FooterComponent,
    PostComponent,
    TrendsListComponent,
    AsyncPipe
  ]
})
export class PostPageComponent implements OnInit {

  post?: Post;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['post']) {
        this.post = JSON.parse(params['post']);
      }
    });
  }
}
