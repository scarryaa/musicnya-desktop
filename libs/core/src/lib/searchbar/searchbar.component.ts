import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicAPIFacade } from '@nyan-inc/shared';
import { SearchItemComponent } from '../search-item/search-item.component';
import {
  Subject,
  debounceTime,
  filter,
  fromEvent,
  of,
  takeUntil,
  tap,
} from 'rxjs';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'core-searchbar',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, NgScrollbarModule],
  template: `<div class="searchbar">
    <div class="searchbar__icon searchbar__icon--search">
      <i class="material-symbols-rounded">search</i>
    </div>
    <div class="searchbar__icon searchbar__icon--close">
      <i class="material-symbols-rounded">close</i>
    </div>
    <input
      #searchbar
      class="searchbar__input"
      type="text"
      placeholder="Search"
    />

    <div class="searchbar__results">
      <ng-scrollbar
        class="searchbar__scrollbar"
        [autoHeightDisabled]="true"
        [autoWidthDisabled]="true"
      >
        <ng-container *ngIf="vm.selectSearchResults$ | async as results">
          <core-search-item
            *ngFor="let data of results"
            [image]="
              data.content?.attributes?.artwork?.url?.replace(
                '{w}x{h}',
                '200x200'
              )
            "
            [title]="data.content?.attributes?.name || $any(data)?.displayTerm"
            [subtitle]="data.content?.attributes?.artistName"
          >
            "]></core-search-item
          >
        </ng-container>
      </ng-scrollbar>
    </div>
  </div>`,
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent implements AfterViewInit, OnDestroy {
  @Input() searchTerm?: string | null;
  @ViewChild('searchbar')
  searchbar?: ElementRef<HTMLInputElement>;
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() destroy$ = new Subject<void>();
  _continueSearch = false;

  constructor(public vm: MusicAPIFacade) {}

  ngAfterViewInit(): void {
    fromEvent(this.searchbar?.nativeElement!, 'scroll')
      .pipe(
        filter(() => !!this.searchbar),
        debounceTime(100),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const { scrollTop, scrollHeight, clientHeight } =
          this.searchbar?.nativeElement!;
        if (scrollTop + clientHeight >= scrollHeight) {
          this.vm.search(this.searchTerm!);
        }
      });

    fromEvent(this.searchbar?.nativeElement!, 'focus')
      .pipe(
        filter(() => !!this.searchbar),
        filter((event: any) => event.target.value.length > 0),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.searchbar?.nativeElement?.classList.add('searchbar--active');
      });

    fromEvent(this.searchbar?.nativeElement!, 'blur')
      .pipe(
        filter(() => !!this.searchbar),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.searchbar?.nativeElement?.classList.remove('searchbar--active');
      });

    fromEvent(this.searchbar?.nativeElement!, 'keyup')
      .pipe(
        filter(() => !!this.searchbar),
        tap((event: any) => {
          switch (event.key) {
            case 'Escape':
            case 'Esc':
              this.searchbar?.nativeElement?.classList.remove(
                'searchbar--active'
              );
              this._continueSearch = false;
              break;
            case 'Enter':
              this.searchbar?.nativeElement?.classList.remove(
                'searchbar--active'
              );
              this._continueSearch = true;
              break;
            case 'Backspace':
              if (event.target.value.length === 0) {
                this.searchbar?.nativeElement?.classList.remove(
                  'searchbar--active'
                );
                this._continueSearch = false;
              } else {
                this._continueSearch = true;
              }
              break;
            default:
              if (
                !this.searchbar?.nativeElement?.classList.contains(
                  'searchbar--active'
                )
              ) {
                this.searchbar?.nativeElement?.classList.add(
                  'searchbar--active'
                );
                this._continueSearch = true;
              }
              break;
          }
        }),
        takeUntil(this.destroy$),
        debounceTime(500)
      )
      .subscribe((event: any) => {
        if (this._continueSearch) {
          this.searchbar?.nativeElement?.classList.add('searchbar--active');
          this.searchEmitter.emit(event.target.value);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
