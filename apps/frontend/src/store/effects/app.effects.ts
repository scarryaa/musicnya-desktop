import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, of, catchError, take } from 'rxjs';
import { LoginService } from '../../app/services/login/login.service';
import { AppActions } from '../actions';

export const checkForLogins$ = createEffect(
  (actions$ = inject(Actions), login = inject(LoginService)) =>
    actions$.pipe(
      ofType(AppActions.checkForLogins),
      take(1),
      switchMap(() => login.checkForLogins()),
      switchMap((data) =>
        of(
          AppActions.checkForLoginsSuccess({
            payload: {
              data: { loggedInAppleMusic: data[0], loggedInSpotify: data[1] },
            },
          })
        )
      ),
      catchError((error: Error) =>
        of(AppActions.checkForLoginsFailure({ payload: { error } }))
      )
    ),
  { functional: true }
);

export const loginAppleMusic$ = createEffect(
  (actions$ = inject(Actions), login = inject(LoginService)) =>
    actions$.pipe(
      ofType(AppActions.loginAppleMusic),
      switchMap(() => login.loginAppleMusic()),
      switchMap(() => of(AppActions.loginAppleMusicSuccess())),
      catchError((error: Error) =>
        of(AppActions.loginAppleMusicFailure({ payload: { error } }))
      )
    ),
  { functional: true }
);

export const logoutAppleMusic$ = createEffect(
  (actions$ = inject(Actions), login = inject(LoginService)) =>
    actions$.pipe(
      ofType(AppActions.loginAppleMusic),
      switchMap(() => login.loginAppleMusic()),
      switchMap(() => of(AppActions.loginAppleMusicSuccess())),
      catchError((error: Error) =>
        of(AppActions.loginAppleMusicFailure({ payload: { error } }))
      )
    ),
  { functional: true }
);

export const loginSpotify$ = createEffect(
  (actions$ = inject(Actions), login = inject(LoginService)) =>
    actions$.pipe(
      ofType(AppActions.loginSpotify),
      switchMap(() => login.loginSpotify()),
      switchMap(() => of(AppActions.loginSpotifySuccess())),
      catchError((error: Error) => {
        console.error('Error', error);
        return of(AppActions.loginSpotifyFailure({ payload: { error } }));
      })
    ),
  { functional: true }
);

export const logoutSpotify$ = createEffect(
  (actions$ = inject(Actions), login = inject(LoginService)) =>
    actions$.pipe(
      ofType(AppActions.logoutSpotify),
      switchMap(() => login.logoutSpotify()),
      switchMap(() => of(AppActions.logoutSpotifySuccess())),
      catchError((error: Error) => {
        console.error('Error', error);
        return of(AppActions.logoutSpotifyFailure({ payload: { error } }));
      })
    ),
  { functional: true }
);
