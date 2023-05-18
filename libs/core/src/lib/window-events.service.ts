import {
  HostListener,
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import {
  BehaviorSubject,
  fromEventPattern,
  Observable,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowEventsService implements OnDestroy {
  private _destroy$ = new Subject();
  resize$!: Observable<Event>;

  constructor(private rendererFactory2: RendererFactory2) {
    const renderer = this.rendererFactory2.createRenderer(null, null);
    this.createOnClickObservable(renderer);
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.resize$.next(true);
  //   console.log('resizing');
  // }

  private createOnClickObservable(renderer: Renderer2) {
    let removeClickEventListener: () => void;
    const createClickEventListener = (
      handler: (e: Event) => boolean | void
    ) => {
      removeClickEventListener = renderer.listen('window', 'resize', handler);
    };

    this.resize$ = fromEventPattern<Event>(createClickEventListener, () =>
      removeClickEventListener()
    ).pipe(
      takeUntil(this._destroy$),
      startWith(new Event('window:resize', { composed: true }))
    );
  }

  ngOnDestroy() {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
}
