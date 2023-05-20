import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowRefService } from '@nyan-inc/core';

@Component({
  selector: 'musicnya-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private _window: any;

  constructor(private windowService: WindowRefService) {
    this._window = this.windowService.nativeWindow;
    (window as any).api.send('auth-window', 'auth-window');
  }
}
