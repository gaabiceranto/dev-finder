import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { devReducer } from './store/dev/dev.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth, connectAuthEmulator } from '@angular/fire/auth';
import { inMemoryPersistence, setPersistence } from '@angular/fire/auth';
import { firebaseConfig } from './config/firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ dev: devReducer }),
    provideAnimations(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth();
      // Configurar persistência em memória apenas (não usa localStorage)
      setPersistence(auth, inMemoryPersistence);
      return auth;
    }),
  ],
};
