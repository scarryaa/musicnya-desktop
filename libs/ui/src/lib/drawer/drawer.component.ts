import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  NgModule,
  OnDestroy,
  QueryList,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';
import { filter, map, Subscription, tap } from 'rxjs';
import { DrawerToggleDirective } from '../directives/drawer-toggle.directive';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BaseComponent } from '@nyan-inc/core';

@Component({
  selector: 'ui-drawer',
  template: `
    <div
      class="ui-drawer"
      [style.--width]="(collapsed ? collapsedWidth : width) + 'rem'"
      [ngClass]="drawerStyleClass"
      [style]="drawerStyle"
      [ngClass]="{
        'drawer-collapsed': _collapsed,
        'drawer-expanded': !_collapsed
      }"
      [style.width.rem]="collapsed ? collapsedWidth : width"
    >
      <div
        class="drawer-wrapper"
        [ngClass]="{
          'drawer-collapsed': _collapsed,
          'drawer-expanded': !_collapsed
        }"
        [style.width.rem]="collapsed ? collapsedWidth : width"
      >
        <div class="ui-drawer-header">
          <div id="header-wrapper">
            <ng-content select="[header]"></ng-content>
          </div>
        </div>
        <div class="ui-drawer-content">
          <div id="content-wrapper">
            <ng-content select="[content]"></ng-content>
            <div class="divider-wrapper">
              <div class="divider"></div>
            </div>
          </div>
        </div>
        <div class="ui-drawer-footer">
          <ng-content select="[footer]"></ng-content>
        </div>
      </div>
    </div>
    <div
      class="drawer-content-wrapper"
      [style.left]="
        (collapsed ? collapsedWidth + _offset : width + _offset) + 'rem'
      "
    >
      <ng-scrollbar
        #scrollbar
        class="content-scroller"
        trackClass="scrollbar"
        thumbClass="scrollbar-thumb"
        [autoHeightDisabled]="true"
      >
        <ng-content select="[body-content]"></ng-content>
      </ng-scrollbar>
    </div>
  `,
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent implements OnDestroy, AfterContentInit {
  constructor(
    public reference: ElementRef,
    private changeReference: ChangeDetectorRef,
    private router: Router
  ) {}

  _collapsed = true;
  _offset = 1;
  @Input() drawerStyleClass!: string;
  @Input() drawerStyle!: string;
  @Input() width = 14;
  @Input() collapsedWidth = 5;

  @ContentChildren(BaseComponent, {
    descendants: true,
  })
  items!: QueryList<BaseComponent>;
  @ContentChild(DrawerToggleDirective)
  drawerToggle!: DrawerToggleDirective;
  _drawerItems: Array<BaseComponent> = [];
  subs: Subscription = new Subscription();

  ngAfterContentInit(): void {
    this._drawerItems = [...this.items];

    this.subs.add(
      this.drawerToggle.drawerOpen$
        .pipe(
          tap((value) => (this.collapsed = !value)),
          tap(() => this.changeReference.markForCheck())
        )
        .subscribe()
    );

    for (const item of this._drawerItems) {
      item.setStyle('span', 'opacity', this.collapsed ? '0' : '1');
      item.setStyle('#baseComponent', 'width', this.collapsed ? '30% ' : '90%');
      setTimeout(() =>
        item.setStyle(
          '#baseComponent #album-info',
          'visibility',
          this.collapsed ? 'hhidden' : 'visible'
        )
      );
      this.changeReference.markForCheck();
    }

    this.subs.add(
      this.items.changes
        .pipe(
          tap((items: QueryList<BaseComponent>) => {
            for (const item of items) {
              item.setStyle('span', 'opacity', this.collapsed ? '0' : '1');
              item.setStyle(
                '#baseComponent',
                'width',
                this.collapsed ? '50% ' : '90%'
              );
              setTimeout(() =>
                item.setStyle(
                  '#baseComponent #album-info',
                  'visibility',
                  this.collapsed ? 'hhidden' : 'visible'
                )
              );
            }
            this._drawerItems = items.toArray();
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public get collapsed() {
    return this._collapsed;
  }

  public set collapsed(value: boolean) {
    this._collapsed = value;

    if (this.items) {
      for (const item of this._drawerItems) {
        item.setStyle('span', 'opacity', this._collapsed ? '0' : '1');
        if (
          (
            item.elementReference.nativeElement as HTMLElement
          ).parentElement?.id.includes('footer-wrapper')
        ) {
          this._collapsed
            ? item.setStyle('self, button', 'width', '82.5%')
            : item.setStyle('self, button', 'width', '90%');
        } else {
          item.setStyle(
            'self, button',
            'width',
            this._collapsed ? '50%' : '90%'
          );
        }

        setTimeout(
          () =>
            item.setStyle(
              '#baseComponent #album-info',
              'visibility',
              this.collapsed ? 'hhidden' : 'visible'
            ),
          this.collapsed ? 300 : 0
        );
      }
    }
  }
}

@NgModule({
  imports: [CommonModule, NgScrollbarModule],
  exports: [DrawerComponent],
  declarations: [DrawerComponent],
})
export class DrawerModule {}
