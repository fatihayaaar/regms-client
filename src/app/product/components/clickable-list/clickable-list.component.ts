import {Component, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-clickable-list',
    templateUrl: './clickable-list.component.html',
    styleUrls: ['./clickable-list.component.scss'],
    standalone: true,
})
export class ClickableListComponent {

    itemClicked = new EventEmitter<string>();
    selectedItem: string | undefined;

    selectItem(item: string) {
        this.selectedItem = item;
        this.itemClicked.emit(item);
    }
}
