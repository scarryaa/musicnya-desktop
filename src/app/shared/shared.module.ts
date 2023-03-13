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
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlbumTileComponent } from './components/album-tile/album-tile.component';
import { CategoryTileComponent } from './components/category-tile/category-tile.component';
import { HeadingComponent } from './components/heading/heading.component';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { ReplaceSrcWidthHeightPipe } from './pipes/replace-src-width-height.pipe';
import { TextAutoFit } from './directives/text-auto-fit.directive';

@NgModule({
  declarations:
    [
      HeaderComponent,
      SideNavComponent,
      FooterComponent,
      ReversePipe,
      MinSecPipe,
      SongPipe,
      ReplaceSrcWidthHeightPipe,
      ScrollDirective,
      LibraryFiltersComponent,
      PlaylistControlsComponent,
      VirtualScrollTableComponent,
      AlbumTileComponent,
      HeadingComponent,
      CategoryTileComponent,
      AppMenuComponent,
      TextAutoFit
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
    MatTooltipModule,
    MatProgressBarModule
  ],
  exports: [
    HeaderComponent,
    SideNavComponent,
    FooterComponent, MinSecPipe,
    ReversePipe, SongPipe,
    ReplaceSrcWidthHeightPipe,
    ScrollDirective,
    VirtualScrollTableComponent,
    AlbumTileComponent,
    CategoryTileComponent,
    HeadingComponent,
    AppMenuComponent,
    TextAutoFit
  ]
})
export class SharedModule { }
