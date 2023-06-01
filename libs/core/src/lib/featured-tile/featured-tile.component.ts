import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  template: ` <div class="media-tile-wrapper">
    <div class="media-tile">
      <div class="media-tile__image-wrapper">
        <img
          class="media-tile__image-wrapper__image"
          [src]="source"
          [style.minWidth.rem]="mediaImageSize"
        />
        <div class="media-tile__image-overlay">
          <div class="media-tile__image-overlay__play-button">
            <div class="media-tile__image-overlay__play-button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
          <div class="media-tile__image-overlay__options-button">
            <div class="media-tile__image-overlay__options-button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="media-tile__headings">
        <div class="media-tile__superheading">{{ superheading }}</div>
        <div class="media-tile-heading">{{ heading }}</div>
        <div class="media-tile__subheading">{{ subheading }}</div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./featured-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedTileComponent {
  @Input() superheading!: string;
  @Input() heading!: string;
  @Input() subheading!: string;
  @Input() source!: string;
  @Input() mediaImageSize = 8;
  @Input() headingRouterLink: string | undefined;
  @Input() artworkRouterLink!: string;
  @Input() routerLink!: string;
  @Input() ngClass!: { [klass: string]: any } | string | string[] | Set<string>;
  @Input() showTitle = false;
  @Input() reasonTitle = '';
}