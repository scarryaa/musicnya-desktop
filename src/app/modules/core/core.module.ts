import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatSliderModule } from '@angular/material/slider';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ScrollDirective } from 'src/app/directives/scroll.directive';
import { LibraryFiltersComponent } from './components/header/components/library-filters/library-filters.component';
import { AngularResizeEventModule } from 'angular-resize-event';
import { BrowserModule } from '@angular/platform-browser';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';
import { MatTableModule } from '@angular/material/table';
import { VirtualScrollTableComponent } from './components/virtual-scroll-table/virtual-scroll-table.component';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { MatSortModule } from '@angular/material/sort';
import { CdkVirtualScrollViewportPatchDirective } from 'src/app/directives/cdk-virtual-scroll-viewport-patch.directive';
import { FallbackSrc } from 'src/app/directives/fallback-src.directive';

@NgModule({
  declarations: [
    AuthenticationComponent,
    SideNavComponent,
    HeaderComponent,
    FooterComponent,
    ScrollDirective,
    LibraryFiltersComponent,
    ReversePipe,
    VirtualScrollTableComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatSlideToggleModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    ScrollingModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    AngularResizeEventModule,
    MatTableModule,
    TableVirtualScrollModule,
    MatSortModule,
    FallbackSrc
  ],
  exports: [AuthenticationComponent, SideNavComponent, HeaderComponent, FooterComponent, ScrollDirective, VirtualScrollTableComponent]
})
export class CoreModule { }
