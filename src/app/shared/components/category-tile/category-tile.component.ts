import { Component } from '@angular/core';

@Component({
  selector: 'app-category-tile',
  templateUrl: './category-tile.component.html',
  styleUrls: ['./category-tile.component.scss']
})
export class CategoryTileComponent {
  categories: Object[] = [...Array(10).keys()];
}
