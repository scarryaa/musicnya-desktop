import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, tap } from 'rxjs';
import * as AppActions from '../actions/app.actions';
import { PreferencesActions } from '../actions';

@Injectable({ providedIn: 'root' })
export class PreferencesEffects {
  private actions$ = inject(Actions);

  getPreferences$ = createEffect(() =>
    this.actions$.pipe(
      tap((action) => console.log(action)),
      ofType(PreferencesActions.getPreferences),
      switchMap(() => of(PreferencesActions.getPreferencesSuccess())),
      catchError((error: Error) => {
        tap(() => console.error(error));
        return of(
          PreferencesActions.getPreferencesFailure({ payload: { error } })
        );
      })
    )
  );

  setPreferences$ = createEffect(() =>
    this.actions$.pipe(
      tap((action) => console.log(action)),
      ofType(PreferencesActions.setPreferences),
      switchMap(() => of(PreferencesActions.setPreferencesSuccess())),
      catchError((error: Error) => {
        tap(() => console.error(error));
        return of(
          PreferencesActions.setPreferencesFailure({ payload: { error } })
        );
      })
    )
  );
}
