import { ChangeDetectionStrategy, Component, ViewEncapsulation, ChangeDetectorRef, ViewChildren, QueryList, ElementRef, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { LibraryViewHandlerService } from 'src/app/services/library-view-handler/library-view-handler.service';
import { Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { UtilitiesService } from 'src/app/app.component';
import { Filter } from './models/filter';

@Component({
  selector: 'app-library-filters',
  templateUrl: './library-filters.component.html',
  styleUrls: ['./library-filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryFiltersComponent implements OnDestroy, OnInit {
  destroyed = new Subject<void>();
  @ViewChild('dropdown', { read: ElementRef, static: true }) dropdown!: ElementRef;
  @ViewChild('filterSelect') filterSelect!: MatSelect;
  @ViewChildren('filterElements', { read: ElementRef }) filterElements?: QueryList<ViewChild>;

  clickSub!: any;
  resizeSub!: any;
  windowWidth: number = 0;
  widthUnhideThreshold: number = 0;
  firstRun: boolean = true;

  constructor(private ref: ChangeDetectorRef, private libraryService: LibraryViewHandlerService, private utilitiesService: UtilitiesService) { }

  ngOnInit() {
    this.ref.detach();

    this.clickSub = this.utilitiesService.documentClickedTarget
      .subscribe(target => this.documentClickListener(target));

    this.resizeSub = this.utilitiesService.windowResized.subscribe(currentWidth => {
      if (this.firstRun) {
        this.firstRun = false;
        this.windowWidth = currentWidth;
        this.widthUnhideThreshold = currentWidth;
      }
      var lastHiddenItem = this.filters[this.filters.findLastIndex((item) => item.hidden)!];
      var lastNotHiddenItem = this.filters[this.filters.findLastIndex((item) => !item.hidden && !item.selected)];

      console.log('windowWidth: ' + this.windowWidth);
      console.log('widthUnhideThreshold: ' + this.widthUnhideThreshold);
      console.log('currentWidth: ' + currentWidth);
      
      //window has gotten wider      
      if (lastHiddenItem && currentWidth > this.widthUnhideThreshold) {
        this.showFilterItem(this.filters[this.filters.findLastIndex((item) => item.hidden)!]);
        this.widthUnhideThreshold = currentWidth + this.getFilterHtmlRef(lastHiddenItem)!.clientWidth;
      }

      // window has gotten smaller
      this.windowWidth = currentWidth;
      this.checkFiltersForOverflow();
    });

    this.ref.detectChanges();
  }

  documentClickListener(target: any): void {
    if (this.filterSelect && !this.dropdown.nativeElement.contains(target)) {
      this.filterSelect.close();
      this.ref.detectChanges();
    }
  }

  public filters: Filter[] = [
    { name: 'Playlists', selected: false, overflowing: false, hidden: false },
    { name: 'Podcasts', selected: false, overflowing: false, hidden: false },
    { name: 'Audiobooks', selected: false, overflowing: false, hidden: false },
    { name: 'Artists', selected: false, overflowing: false, hidden: false },
    { name: 'Albums', selected: false, overflowing: false, hidden: false }
  ];

  public changeView(item: Filter, isDropdown: boolean) {
    if (isDropdown) {
      var filterItem = this.filters.find((i) => i.name == item.name);
      if (filterItem!.hidden || filterItem!.overflowing) {
        var lastNotHidden = this.filters.findLastIndex((i) => i.hidden == false);
        if (lastNotHidden == this.filters.indexOf(filterItem!)) {
          filterItem!.hidden = false;
          filterItem!.overflowing = false;
          this.filters[lastNotHidden - 1].hidden = true;
          this.filters[lastNotHidden - 1].overflowing = true;
        } else {
          filterItem!.hidden = false;
          filterItem!.overflowing = false;
          this.filters[lastNotHidden].hidden = true;
          this.filters[lastNotHidden].overflowing = true;
        }
      }
    }
    this.filters.forEach((filter) => filter.selected ? filter.selected = false : null);
    item.selected = true;
    this.libraryService.setRefresh(item.name.toLowerCase());
    this.ref.detectChanges();
  }

  onDropdownClick() {
    this.ref.detectChanges();
  }

  checkFiltersForOverflow(): void {
    for (let index = this.filters.length - 1; index >= 0; index--) {
      const item = this.filters[index];
      item.overflowing = this.getFilterHtmlRef(item)!.offsetTop > 0;

      //if filter item is overflowing/hidden and selected, we should prioritize showing it and recalculate the others
      if ((item.hidden || item.overflowing) && item.selected) {
        this.hideFilterItem(this.filters[this.filters.findLastIndex((elem) => !elem.hidden && elem.name != item.name)]);
        this.showFilterItem(item);
      }
    }
  }

  private showFilterItem(item: Filter) {
    item.hidden = false;
    this.ref.detectChanges();
  }

  private hideFilterItem(item: Filter) {
    item.hidden = true;
    this.ref.detectChanges();
  }

  private setFilterStatus(index: number): void {
    let currentFilter: Filter = this.filters[index];

    // if item is selected, don't hide it & recalculate the others...
    if (currentFilter.selected) {
      currentFilter.hidden = false;
      // determine which items to hide, e.g. call this function recursively on the other filters
      // find the next filter item which is not hidden and is not the current filter item
      return this.setFilterStatus(index - 1);
    // ...otherwise, if the item is not selected, we can hide it
    } else {
      currentFilter.hidden = true;
      this.addItemToDropdown(this.getFilterHtmlRef(currentFilter)!);
    }
  }

  addItemToDropdown(item: HTMLElement): void {

  }

  getFilterHtmlRef(filterItem: Filter): HTMLElement | null {
    return document.getElementById(filterItem.name.toLowerCase() + '_library_filter');
  }

  ngOnDestroy() {
    this.clickSub.unsubscribe();
    this.resizeSub.unsubscribe();
    this.destroyed.next();
    this.destroyed.complete();
  }
}
