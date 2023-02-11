import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, ChangeDetectorRef, ViewChildren, QueryList, ElementRef, OnDestroy, AfterViewChecked, ViewChild } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { LibraryViewHandlerService } from 'src/app/services/library-view-handler/library-view-handler.service';
import { filter, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-library-filters',
  templateUrl: './library-filters.component.html',
  styleUrls: ['./library-filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryFiltersComponent implements OnDestroy, AfterViewChecked {
  destroyed = new Subject<void>();
  
  displayNameMap: any;
  constructor(private ref: ChangeDetectorRef, private libraryService: LibraryViewHandlerService, breakpointObserver: BreakpointObserver) {
    breakpointObserver
    .observe(["(max-width: 880px)"])
    .subscribe(result => {
      this.showAudiobooks();
    });
  }

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }

  selected = '';
  selectValue = '';

  @ViewChildren('filterElements', {read: ElementRef}) filterElements?: QueryList<any>;
  @ViewChild('filterSelect') filterSelect?: MatSelect;

  public filters = [{ name: 'Playlists', selected: false, overflowing: false, hidden: false }, 
                    { name: 'Podcasts', selected: false, overflowing: false, hidden: false }, 
                    { name: 'Audiobooks', selected: false, overflowing: false, hidden: false }, 
                    { name: 'Artists', selected: false, overflowing: false, hidden: false }, 
                    { name: 'Albums', selected: false, overflowing: false, hidden: false }];

  showAudiobooks() {
    if (this.filters[2].hidden) this.filters[2].hidden = false;
    else if (this.filters[3].hidden) this.filters[3].hidden = false;
    else if (this.filters[4].hidden) this.filters[3].hidden = false;
  }

  public changeView(item: any, isDropdown: boolean) {
    if (isDropdown) {
      var filterItem = this.filters.find((i) => i.name == item.name)
      if (filterItem!.hidden || filterItem!.overflowing) {
        var currentlySelected = this.filters.find((i) => i.selected == true)
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
    this.selected = item.name;
    this.filters.forEach((filter) => filter.selected ? filter.selected = false : null)
    this.libraryService.setRefresh(item.name.toLowerCase());
    item.selected = true;
  } 

  isTextOverflow(item: any): boolean {
    const elem = document.getElementById(item.name.toLowerCase() + '_library_filter');
    var startingIndex = this.filters.findIndex((i) => i.name == item.name);
    const overflowing = elem!.offsetTop > 0;
    var oldOverflow = this.filters[startingIndex]!.overflowing;
    this.filters[startingIndex]!.overflowing = overflowing;
    
    if (this.filters[startingIndex].overflowing && this.filters[startingIndex].selected) {
      this.findItem(startingIndex);
    }

    if(!this.filters.some((i) => i.hidden == true || i.overflowing == true) && this.filterSelect) {
      this.filterSelect!.close();
    }

    return overflowing || this.filters[startingIndex]!.hidden;
  }

  onResized(event: ResizedEvent) {
    this.ref.markForCheck();
  }

  onDropdownResized(event: ResizedEvent) {
    var lastPos;
    if (!event.isFirst) {
      lastPos = event.oldRect!.x;
      if (event.oldRect!.x < event.newRect.x || event.newRect.x >= lastPos) {
        this.filters.forEach((i) => i.hidden = false);
      }
    }
    else lastPos = event.newRect.x;
    this.ref.markForCheck();  
  }

  private findItem(index: number): any {
    let totalItems: number = this.filters.length - 1;

    if (index === totalItems) {
        if (this.filters[index].selected) {
          this.filters[index].hidden = false;
          return this.findItem(this.filters[index - 1].hidden ? index - 2 : index - 1);
      } else {
        this.filters[index].hidden = true;
        return document.getElementById(this.filters[index].name.toLowerCase() + '_library_filter');
      }
    }
    else if (index < totalItems) {
      if (this.filters.at(index)?.selected == false) {
        this.filters[index].hidden = true;
        return document.getElementById(this.filters[index].name.toLowerCase() + '_library_filter');
      } else {
        if (this.filters[index + 1] != null && this.filters[index + 1].hidden == false && this.filters[index + 1].overflowing == true) this.filters[index + 1].hidden = true;
        return (this.filters[index + 1] != null && this.filters[index + 1].hidden == false && this.filters[index + 1].overflowing == false) ? this.findItem(index + 1) : this.findItem(index - 1);
      }
    }
    index != 0 ? index -= 1 : index = 0;
    var elemToHide = document.getElementById(this.filters[index].name.toLowerCase() + '_library_filter');

    if (elemToHide?.style.display == 'none') {
      return this.findItem(index - 1);
    } else {
      this.filters[index].hidden = true;
      return elemToHide;
    }
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
