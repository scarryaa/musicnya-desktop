import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Command, ElectronService } from '../electron/electron.service';


@Injectable({
  providedIn: 'root'
})
export class WindowService {
  electronService!: ElectronService;

  constructor(private injector: Injector) {
    if (environment.useElectron) this.electronService = injector.get<ElectronService>(ElectronService);
  }

  closeWindow() {
    this.electronService.sendMessage(Command.CloseWindow);
  }

  minWindow() {
    this.electronService.sendMessage(Command.MinimizeWindow);
  }

  maxWindow() {
    this.electronService.sendMessage(Command.MaximizeWindow);
  }
}
