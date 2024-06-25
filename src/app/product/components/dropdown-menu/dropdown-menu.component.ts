import {Component, HostListener, Input, OnInit} from '@angular/core';
import {PostService} from "../../services/post/post.service";
import {Post} from "../../models/post.model";

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.scss'],
    standalone: true,
})
export class DropdownMenuComponent implements OnInit {

    @Input() postId?: string;
    @Input() isMyPost?: boolean;

    isOpen: boolean = false;
    selectedOption: string | undefined;
    options?: string[];

    constructor(private postService: PostService) {
    }

    ngOnInit() {
        if (this.isMyPost) {
            this.options = ['Delete'];
        } else {
            this.options = ['Report'];
        }
    }

    @HostListener('document:click', ['$event']) clickOutside(event: MouseEvent) {
        if (!(event.target instanceof HTMLElement) || !event.target.closest('.dropdown')) {
            this.isOpen = false;
        }
    }

    selectOption(option: string) {
        this.selectedOption = option;
        if (option === 'Delete') {
            this.deleteOption();
        }
        this.isOpen = false;
    }

    deleteOption() {
        const post: Post = {
            id: this.postId
        };
        this.postService.deletePost(post);
    }
}
