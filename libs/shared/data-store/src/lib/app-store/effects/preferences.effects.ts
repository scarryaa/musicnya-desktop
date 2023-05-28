import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, tap } from 'rxjs';
import { PreferencesActions } from '../actions';

export const getPreferences$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(PreferencesActions.getPreferences),
      switchMap(() => of(PreferencesActions.getPreferencesSuccess())),
      catchError((error: Error) => {
        tap(() => console.error(error));
        return of(
          PreferencesActions.getPreferencesFailure({ payload: { error } })
        );
      })
    ),
  { functional: true }
);

export const setPreferences$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(PreferencesActions.setPreferences),
      switchMap(() => of(PreferencesActions.setPreferencesSuccess())),
      catchError((error: Error) => {
        tap(() => console.error(error));
        return of(
          PreferencesActions.setPreferencesFailure({ payload: { error } })
        );
      })
    ),
  { functional: true }
);
