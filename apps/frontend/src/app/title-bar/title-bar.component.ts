/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonModule } from '@nyan-inc/core';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { CdkMenu } from '@angular/cdk/menu';
import { MenuComponent, MenuItemComponent } from '@nyan-inc/ui';
import { CdkMenuItem } from '@angular/cdk/menu';
import { MusicnyaMenuComponent } from '../menu/menu.component';
import { EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';

@Component({
  selector: 'musicnya-title-bar',
  standalone: true,
  imports: [
    CommonModule,
    BaseButtonModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    MenuComponent,
    MenuItemComponent,
    MusicnyaMenuComponent,
  ],
  template: `<div id="title-bar">
      <div id="titlebar-file-menu-wrapper">
        <core-base-button
          [cdkMenuTriggerFor]="menu"
          class="ui-button-m text-reg titlebar-button"
          icon="more_horiz"
          id="titlebar-file-menu"
        ></core-base-button>
      </div>
      <div>
        <div
          (click)="minimizeWindow()"
          (keyup.Space)="minimizeWindow()"
          (keyup.Enter)="minimizeWindow()"
          class="titlebar-button"
          id="titlebar-minimize"
          [tabIndex]="0"
        >
          <i class="material-symbols-rounded">remove</i>
        </div>
        <div
          (click)="maximizeWindow()"
          (keyup.Space)="maximizeWindow()"
          (keyup.Enter)="maximizeWindow()"
          class="titlebar-button"
          id="titlebar-maximize"
          [tabIndex]="0"
        >
          <i class="material-symbols-rounded">check_box_outline_blank</i>
        </div>
        <div
          (click)="closeWindow()"
          (keyup.Space)="closeWindow()"
          (keyup.Enter)="closeWindow()"
          class="titlebar-button"
          id="titlebar-close"
          [tabIndex]="0"
        >
          <i class="material-symbols-rounded">close</i>
        </div>
      </div>
    </div>
    <ng-template #menu>
      <musicnya-menu
        [loggedInSpotify]="loggedInSpotify"
        [loggedInAppleMusic]="loggedInAppleMusic"
        (clickEmitter)="clickEmitter.emit($event)"
      ></musicnya-menu>
    </ng-template>`,
  styleUrls: ['./title-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleBarComponent {
  @Input() loggedInSpotify = false;
  @Input() loggedInAppleMusic = false;
  @Output() clickEmitter = new EventEmitter<string>();

  openAppleMenu() {
    (window as any).api.send('apple-music-login', 'apple-music-login');
  }

  openSpotifyMenu() {}

  minimizeWindow() {
    (window as any).api.send('minimize-window');
  }

  maximizeWindow() {
    (window as any).api.send('maximize-window');
  }

  closeWindow() {
    (window as any).api.send('close-window');
  }
}
