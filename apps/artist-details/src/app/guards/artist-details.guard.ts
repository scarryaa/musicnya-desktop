/* eslint-disable functional/prefer-immutable-types */
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MusicAPIFacade } from '@nyan-inc/shared';

export const artistDetailsGuard: CanActivateFn = (route) => {
  const musicAPIFacade = inject(MusicAPIFacade);
  const id = route.params['id'];
  musicAPIFacade.getArtist(id);
  return true;
};
