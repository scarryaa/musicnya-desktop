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
import { Router } from '@angular/router';

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
          <ng-container *ngFor="let data of $any(results)">
            <core-search-item
              (clickEmitter)="handleClick(data.content?.type, data.content?.id)"
              class="searchbar__item"
              *ngIf="data.content?.attributes?.artwork?.url"
              [type]="data.content?.type"
              [image]="
                data.content?.attributes?.artwork?.url?.replace(
                  '{w}x{h}',
                  '200x200'
                )
              "
              [title]="
                data.content?.attributes?.name || $any(data)?.displayTerm
              "
              [subtitle]="
                data.content?.attributes?.artistName
                  ? data.content?.attributes?.artistName +
                    ' • ' +
                    data.content?.type
                  : data.content?.type
              "
            >
              "]></core-search-item
            >
          </ng-container>
        </ng-container>
      </ng-scrollbar>
    </div>
  </div>`,
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent implements AfterViewInit, OnDestroy {
  @Input() searchTerm?: string | null;
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() songEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Input() vm: any;
  @Output() destroy$ = new Subject<void>();
  _continueSearch = false;

  @ViewChild('searchbar')
  searchbar?: ElementRef<HTMLInputElement>;

  @ViewChild('searchbar__results')
  searchbarResults?: ElementRef<HTMLDivElement>;

  @ViewChild('searchbar__item')
  searchbarItem?: ElementRef<HTMLDivElement>;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
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
      .subscribe(($event) => {
        if (!(event as any).relatedTarget) {
          this.searchbar?.nativeElement?.classList.remove('searchbar--active');
        }
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
            case 'Tab':
              // check if tab is on results
              if (
                this.searchbar?.nativeElement?.classList.contains(
                  'searchbar--active'
                ) &&
                this.searchbarResults?.nativeElement?.contains(event.target)
              ) {
                this.searchbar?.nativeElement?.classList.remove(
                  'searchbar--active'
                );
                this._continueSearch = false;
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

    fromEvent(this.searchbar?.nativeElement!, 'keydown')
      .pipe(
        filter(() => !!this.searchbar),
        tap((event: any) => {
          switch (event.key) {
            case 'Escape':
            case 'Esc':
            case 'Enter':
              event.preventDefault();
              event.stopPropagation();
              break;
            default:
              break;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    fromEvent(this.searchbarResults?.nativeElement!, 'keyup')
      .pipe(
        filter(() => !!this.searchbarResults),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        switch (event.key) {
          case 'Escape':
          case 'Esc':
            this.searchbar?.nativeElement?.classList.remove(
              'searchbar--active'
            );
            break;
          case 'Tab':
            // check if tab is on results
            if (
              this.searchbar?.nativeElement?.classList.contains(
                'searchbar--active'
              ) &&
              this.searchbarResults?.nativeElement?.contains(event.target)
            ) {
              this.searchbar?.nativeElement?.classList.remove(
                'searchbar--active'
              );
            }
            break;
          default:
            break;
        }
      });

    fromEvent(this.searchbarResults?.nativeElement!, 'keydown')
      .pipe(
        filter(() => !!this.searchbarResults),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        switch (event.key) {
          case 'Escape':
          case 'Esc':
          case 'Enter':
            this.searchbar?.nativeElement?.classList.remove(
              'searchbar--active'
            );
            break;
          default:
            break;
        }
      });

    fromEvent(this.searchbarItem?.nativeElement!, 'blur')
      .pipe(
        filter(() => !!this.searchbarItem),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        if (!(event as any).relatedTarget) {
          this.searchbar?.nativeElement?.classList.remove('searchbar--active');
        }
      });

    fromEvent(this.searchbarItem?.nativeElement!, 'keyup')
      .pipe(
        filter(() => !!this.searchbarItem),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        switch (event.key) {
          case 'Escape':
          case 'Esc':
            this.searchbar?.nativeElement?.classList.remove(
              'searchbar--active'
            );
            break;
          case 'Tab':
            // check if tab is on results
            if (
              this.searchbar?.nativeElement?.classList.contains(
                'searchbar--active'
              ) &&
              this.searchbarItem?.nativeElement?.contains(event.target)
            ) {
              this.searchbar?.nativeElement?.classList.remove(
                'searchbar--active'
              );
            }
            break;
          default:
            break;
        }
      });
  }

  handleClick(type: string, id: string) {
    switch (type) {
      case 'songs':
        this.songEmitter.emit(id);
        break;
      case 'albums':
        this.router.navigate(['media/albums', id]);
        break;
      case 'artists':
        this.router.navigate(['media/artists', id]);
        break;
      case 'playlists':
        this.router.navigate(['media/playlists', id]);
        break;
      case 'stations':
        //
        break;
      case 'music-videos':
        //
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
