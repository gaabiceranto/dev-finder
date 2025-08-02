import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), MatToolbarModule, MatSidenavModule, MatListModule]
};