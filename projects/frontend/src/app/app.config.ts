import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { devReducer } from './store/dev/dev.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCpypkHgtG3PVSd4cIS2V5sb8TgMq_vkjc',
  authDomain: 'dev-finder-8a8e0.firebaseapp.com',
  projectId: 'dev-finder-8a8e0',
  storageBucket: 'dev-finder-8a8e0.firebasestorage.app',
  messagingSenderId: '335621662699',
  appId: '1:335621662699:web:69a890d15011440119dbae',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideStore({ dev: devReducer }),
    provideAnimations(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
