import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {FooterComponent} from "../../components/footer/footer.component";
import {ClickableListComponent} from "../../components/clickable-list/clickable-list.component";
import {PostComponent} from "../../components/post/post.component";
import {TrendsListComponent} from "../../components/trends-list/trends-list.component";
import {PostService} from "../../services/post/post.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [ClickableListComponent, FooterComponent, PostComponent, TrendsListComponent, AsyncPipe]
})
export class HomeComponent implements OnInit {

    posts: Post[] = [];

    constructor(private postService: PostService) {
    }

    ngOnInit(): void {
        this.postService.currentPosts.subscribe(posts => this.posts = posts);
        this.postService.getPosts().subscribe(posts => this.postService.setPosts(posts));
    }
}
