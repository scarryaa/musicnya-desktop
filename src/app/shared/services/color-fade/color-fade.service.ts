import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorFadeService {
  private myFunctionCallSource = new BehaviorSubject<[number, string]>([0, 'FFFFFF']);
  myFunctionCalled$ = this.myFunctionCallSource.asObservable();
  
  private playlistTitle = new BehaviorSubject<string>('');
  playlistTitle$ = this.playlistTitle.asObservable();

  changeOpacity(opacity: number, color: string) {
      this.myFunctionCallSource.next([opacity, color]);
  }

  setTitle(title: string) {
    this.playlistTitle.next(title);
  }

}