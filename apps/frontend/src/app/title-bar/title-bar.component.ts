import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonModule } from '@nyan-inc/core';

@Component({
  selector: 'musicnya-title-bar',
  standalone: true,
  imports: [CommonModule, BaseButtonModule],
  template: `<div id="title-bar" data-tauri-drag-region>
    <div id="titlebar-file-menu-wrapper">
      <core-base-button
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
  </div>`,
  styleUrls: ['./title-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleBarComponent {
  constructor() {}

  async minimizeWindow() {
    // await this.currentWindow.minimize();
  }

  async maximizeWindow() {
    // await this.currentWindow.maximize();
  }

  async closeWindow() {
    // await this.currentWindow.close();
  }
}
