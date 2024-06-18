import { Component } from '@angular/core';

@Component({
  selector: 'app-trends-list',
  templateUrl: './trends-list.component.html',
  styleUrl: './trends-list.component.scss',
  standalone: true,
})
export class TrendsListComponent {
  items = [
    "Çorba",
    "Fatih Ayar Yalnız Değildir",
    "Yaşasın Regms",
    "#BlackMirror "
  ];

}
