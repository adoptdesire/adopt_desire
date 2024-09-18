import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { ApplicationRef } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
const bootstrap = (): Promise<ApplicationRef> => bootstrapApplication(AppComponent, config);

export default bootstrap;
