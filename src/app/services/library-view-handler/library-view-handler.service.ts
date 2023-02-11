import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryViewHandlerService {
  constructor() {}

  private refresh: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public getRefresh(): Observable<string> {
     return this.refresh.asObservable();
  }
  
  public setRefresh(value: string): void {
     this.refresh.next(value);
  } 
}
