import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WindowService } from '../../services/window/window.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { MatMenu } from '@angular/material/menu';
import { UIState, UIStore } from 'src/app/store/ui-store';
import { ThemeState, ThemeStore } from 'src/app/store/theme-store';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { hexToRgb } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  showFileMenuButton: boolean;
  @Input() matMenu!: MatMenu;
  subs: Subscription;
  currentBackgroundColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  //TODO implement back navigation within library filters page

  constructor(public windowService: WindowService, public uiStore: UIStore,
    public navigationService: NavigationService, public themeStore: ThemeStore,
    private ref: ChangeDetectorRef) {
      this.backgroundOpacity = 0;
      this.currentBackgroundColor = hexToRgb(Constants.headerColorDark, true)!;
      this.backgroundColor = 'rgb(' + this.currentBackgroundColor + ')';
      this.subs = new Subscription();
      this.showFileMenuButton = !this.uiStore.state.drawerCollapsed;
    }

  ngOnInit(): void {
    this.subs.add(this.uiStore.state$.pipe(
      map((state: UIState) => state.headerPageControlsOpacity),
      distinctUntilChanged())
      .subscribe(headerPageControlsOpacity => {
        this.backgroundOpacity = headerPageControlsOpacity;
        this.backgroundColor = 'rgba(' + this.currentBackgroundColor + ', ' + this.backgroundOpacity + ')';
        this.ref.detectChanges();
      }));

      this.subs.add(this.themeStore.state$.pipe(
        map((state: ThemeState) => state.headerColor),
        distinctUntilChanged())
        .subscribe(headerColor => {
          this.currentBackgroundColor = headerColor;
          this.backgroundColor = 'rgba(' + this.currentBackgroundColor + ', ' + this.backgroundOpacity + ')';
          this.ref.detectChanges();
        }));
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  @Input() searchInput: string = '';

  toggleFileMenuButton() {
    this.showFileMenuButton = !this.showFileMenuButton;
  }
}