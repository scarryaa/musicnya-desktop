import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { MenuComponent, MenuItemComponent } from '@nyan-inc/ui';

@Component({
  selector: 'musicnya-menu',
  standalone: true,
  imports: [CommonModule, MenuComponent, MenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicnyaMenuComponent implements OnChanges {
  @Input() loggedInAppleMusic = false;
  @Input() loggedInSpotify = false;
  @Output() clickEmitter = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loggedInAppleMusic']) {
      this.loggedInAppleMusic = changes['loggedInAppleMusic'].currentValue;
      console.log(changes);
    }

    if (changes['loggedInSpotify']) {
      this.loggedInSpotify = changes['loggedInSpotify'].currentValue;
    }
  }
}
