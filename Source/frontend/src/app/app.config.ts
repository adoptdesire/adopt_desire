import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration()],
};
