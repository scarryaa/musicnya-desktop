import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideServerRendering, ServerModule } from '@angular/platform-server';
import { appConfig } from './app.config';

export const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), importProvidersFrom(ServerModule)],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
