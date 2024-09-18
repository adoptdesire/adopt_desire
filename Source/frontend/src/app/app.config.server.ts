import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

// eslint-disable-next-line @typescript-eslint/naming-convention
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const config = mergeApplicationConfig(appConfig, serverConfig);
