import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'core-link-tile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<div
    class="link-tile"
    (click)="handleLinkClick(link || '', external || false)"
  >
    <ng-content></ng-content>
    <div class="link-tile__arrow">
      <i class="material-symbols-rounded">chevron_right</i>
    </div>
  </div>`,
  styleUrls: ['./link-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkTileComponent {
  @Input() link?: string;
  @Input() external?: boolean;

  constructor(private router: Router) {}

  handleLinkClick(link: string, external: boolean) {
    if (external) {
      window.open(link, '_blank');
    } else {
      this.router.navigateByUrl(link);
    }
  }
}
