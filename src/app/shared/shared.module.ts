import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SideNavComponent } from 'src/app/shared/components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ReversePipe } from './pipes/reverse.pipe';
import { MinSecPipe } from './pipes/min-sec.pipe';
import { SongPipe } from './pipes/song.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ScrollDirective } from './directives/scroll.directive';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LibraryFiltersComponent } from './components/header/components/library-filters/library-filters.component';
import { PlaylistControlsComponent } from './components/header/components/playlist-controls/playlist-controls/playlist-controls.component';
import { VirtualScrollTableComponent } from './components/virtual-scroll-table/virtual-scroll-table.component';
import { FallbackSrc } from './directives/fallback-src.directive';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations:
    [
      HeaderComponent,
      SideNavComponent,
      FooterComponent,
      ReversePipe,
      MinSecPipe,
      SongPipe,
      ScrollDirective,
      LibraryFiltersComponent,
      PlaylistControlsComponent,
      VirtualScrollTableComponent
    ],
  imports: [
    RouterModule,
    CommonModule,
    MatTableModule,
    ScrollingModule,
    MatSortModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    TableVirtualScrollModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    FallbackSrc,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [
    HeaderComponent,
    SideNavComponent,
    FooterComponent, MinSecPipe,
    ReversePipe, SongPipe,
    ScrollDirective,
    VirtualScrollTableComponent
  ]
})
export class SharedModule { }
