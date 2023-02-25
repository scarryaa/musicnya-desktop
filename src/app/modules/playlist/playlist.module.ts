import { NgModule } from '@angular/core';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistRoutingModule } from './playlist-routing.module';
import { FallbackSrc } from 'src/app/shared/directives/fallback-src.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '../core/core.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PlaylistComponent
  ],
  imports: [
    PlaylistRoutingModule,
    MatIconModule,
    MatButtonModule,
    CoreModule,
    SharedModule,
    ScrollingModule,
    TableVirtualScrollModule,
    FallbackSrc
  ]
})
export class PlaylistModule {}
