import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { Observable, map } from 'rxjs';

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerData: any[];
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  public user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
  }

  async signInWithGitHub(): Promise<void> {
    try {
      const provider = new GithubAuthProvider();
      provider.addScope('read:user');
      provider.addScope('user:email');

      await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.error('Erro ao fazer login com GitHub:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }

  getCurrentUser(): Observable<FirebaseUser | null> {
    return this.user$.pipe(
      map((user) => {
        if (!user) return null;

        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          providerData: user.providerData,
        };
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }
}
