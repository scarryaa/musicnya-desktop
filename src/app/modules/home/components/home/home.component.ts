import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  recentlyPlayedItems: Object[] = [...Array(7).keys()];
  userStations: Object[] = [...Array(7).keys()];
}
