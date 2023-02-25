import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist-controls',
  templateUrl: './playlist-controls.component.html',
  styleUrls: ['./playlist-controls.component.scss']
})
export class PlaylistControlsComponent {
  constructor() {}

  @Input() opacity: number = 0;
  @Input() title: string = '';
}
