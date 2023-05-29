import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { fromSpinner } from '../reducers';
import { SpinnerState } from '../reducers/spinner.reducer';

@Injectable({
  providedIn: 'root',
})
export class SpinnerFacade {
  state$ = this.store.pipe(select(fromSpinner.getSpinnerState));
  show$ = this.state$.pipe(map((state) => state.show));

  constructor(private store: Store<SpinnerState>) {}
}
