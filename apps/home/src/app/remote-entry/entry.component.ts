import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { MusickitFacade } from '@nyan-inc/musickit-typescript';

@Component({
  standalone: true,
  imports: [CommonModule, HomeComponent],
  selector: 'musicnya-home-entry',
  template: `<musicnya-home></musicnya-home>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent implements OnInit {
  musickitFacade = inject(MusickitFacade);

  ngOnInit(): void {}
}
