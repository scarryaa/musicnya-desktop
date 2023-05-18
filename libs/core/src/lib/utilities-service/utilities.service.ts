import {
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { fromEventPattern, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService implements OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  mouseDown$: Observable<Event> = new Observable<Event>();
  mouseMove$: Observable<Event> = new Observable<Event>();
  mouseUp$: Observable<Event> = new Observable<Event>();

  constructor(private rendererFactory: RendererFactory2) {
    const renderer = this.rendererFactory.createRenderer(null, null);
    this.createOnMouseDownObservable(renderer);
    this.createOnMoveObservable(renderer);
    this.createOnMouseUpObservable(renderer);
  }

  private createOnMouseDownObservable(renderer: Renderer2) {
    let removeOnMouseDownEventListener: () => void;
    const createOnMouseDownEventListener = (
      handler: (event: MouseEvent) => boolean | void
    ) => {
      removeOnMouseDownEventListener = renderer.listen(
        'document',
        'mousedown',
        handler
      );
    };

    this.mouseDown$ = fromEventPattern<Event>(
      createOnMouseDownEventListener,
      () => removeOnMouseDownEventListener()
    ).pipe(takeUntil(this._destroy$));
  }

  private createOnMoveObservable(renderer: Renderer2) {
    let removeOnMoveEventListener: () => void;
    const createMoveEventListener = (
      handler: (event: MouseEvent) => boolean | void
    ) => {
      removeOnMoveEventListener = renderer.listen(
        'document',
        'mousemove',
        handler
      );
    };

    this.mouseMove$ = fromEventPattern<Event>(createMoveEventListener, () =>
      removeOnMoveEventListener()
    ).pipe(takeUntil(this._destroy$));
  }

  private createOnMouseUpObservable(renderer: Renderer2) {
    let removeMouseUpEventListener: () => void;
    const createMouseUpEventListener = (
      handler: (event: MouseEvent) => boolean | void
    ) => {
      removeMouseUpEventListener = renderer.listen(
        'document',
        'mouseup',
        handler
      );
    };

    this.mouseUp$ = fromEventPattern<Event>(createMouseUpEventListener, () =>
      removeMouseUpEventListener()
    ).pipe(takeUntil(this._destroy$));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
