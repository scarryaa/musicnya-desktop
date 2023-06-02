import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MusicAPIFacade } from '@nyan-inc/shared';

export const artistDetailsGuard: CanActivateFn = (route, state) => {
  const musicAPIFacade = inject(MusicAPIFacade);
  const id = route.params['id'];
  musicAPIFacade.getArtist(id);
  return true;
};
