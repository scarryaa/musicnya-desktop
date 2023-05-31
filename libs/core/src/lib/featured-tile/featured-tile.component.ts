import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonModule } from '../base-button/base-button.component';
import { RouterModule } from '@angular/router';
import { FallbackImageDirective } from '../fallback-image.directive';

@Component({
  selector: 'core-featured-tile',
  standalone: true,
  imports: [
    CommonModule,
    BaseButtonModule,
    RouterModule,
    FallbackImageDirective,
  ],
  template: ` <p *ngIf="showTitle">Featured</p>
    <div class="tile-wrapper">
      <div class="image-wrapper">
        <img
          loading="lazy"
          defaultImage="assets/images/default.png"
          id="artwork"
          alt="art"
          [src]="source"
          [style.max-width.rem]="tileSize"
          [style.max-height.rem]="tileSize"
          [routerLink]="artworkRouterLink"
        />
      </div>
      <div class="headings-wrapper">
        <p>{{ superheading }}</p>
        <p [routerLink]="headingRouterLink">{{ heading }}</p>
        <p>{{ subheading }}</p>
      </div>
    </div>`,
  styleUrls: ['./featured-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FeaturedTileComponent {
  @Input() superheading!: string;
  @Input() heading!: string;
  @Input() subheading!: string;
  @Input() source!: string;
  @Input() tileSize = 8;
  @Input() headingRouterLink: string | undefined;
  @Input() artworkRouterLink!: string;
  @Input() routerLink!: string;
  @Input() ngClass!: { [klass: string]: any } | string | string[] | Set<string>;
  @Input() showTitle = false;
}
