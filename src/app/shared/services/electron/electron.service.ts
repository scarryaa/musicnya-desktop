import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';


interface Payload {
  command: Command,
  data: string | null
}

const enum Channel {
  ToMain = "toMain",
  FromMain = "fromMain"
}

interface IcpRenderer {
  send(channel: Channel, contents: Payload): void;
  receive(channel: Channel, callback: Callback): void;
}

type Callback = (data: Payload) => Payload;

export const enum Command {
  GetPlatform = "whatPlatform",
  CloseWindow = "closeWindow",
  MinimizeWindow = "minimizeWindow",
  MaximizeWindow = "maximizeWindow"
}

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  constructor() {
    this._icpRenderer = (<any>window).api;
    this._icpRenderer.receive(Channel.FromMain, ((data: Payload) => {
      this._messages$.next(data);
      return data;
    }));
  }

  private _icpRenderer: IcpRenderer;
  private _subs: Subscription = new Subscription();
  private _messages$: Subject<Payload> = new Subject<Payload>();
  public messages$ = this._messages$.asObservable();

  public sendMessage(command: Command, data?: Object): void {
    let stringPayload: string;
    if (data) stringPayload = JSON.stringify(data);

    this._icpRenderer.send(Channel.ToMain, { command: command, data: stringPayload! ?? null });
  }
}