import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  user,
  User,
  getAdditionalUserInfo,
} from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, from } from 'rxjs';

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerData: any[];
  githubUsername?: string;
  githubProfileUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  private auth: Auth = inject(Auth);
  private http: HttpClient = inject(HttpClient);
  public user$: Observable<User | null>;

  constructor() {
    this.user$ = user(this.auth);
  }

  async signInWithGitHub(): Promise<{
    githubProfileUrl?: string;
    githubUsername?: string;
  }> {
    try {
      const provider = new GithubAuthProvider();
      provider.addScope('read:user');
      provider.addScope('user:email');

      const result = await signInWithPopup(this.auth, provider);

      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (token) {
        const headers = new HttpHeaders({
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        });

        try {
          const profile = await this.http
            .get<any>('https://api.github.com/user', { headers })
            .toPromise();

          return {
            githubProfileUrl: profile.html_url,
            githubUsername: profile.login,
          };
        } catch (apiError) {
          console.error('Erro ao buscar dados do GitHub:', apiError);
          return this.getGitHubInfoFromAdditionalInfo(result);
        }
      } else {
        return this.getGitHubInfoFromAdditionalInfo(result);
      }
    } catch (error) {
      console.error('Erro ao fazer login com GitHub:', error);
      throw error;
    }
  }

  private getGitHubInfoFromAdditionalInfo(result: any): {
    githubProfileUrl?: string;
    githubUsername?: string;
  } {
    const additionalInfo = getAdditionalUserInfo(result);
    const profile = additionalInfo?.profile as any;

    let githubProfileUrl = '';
    let githubUsername = '';

    if (profile) {
      githubUsername =
        profile.screenName || profile.login || result.user.displayName || '';

      if (githubUsername) {
        githubProfileUrl = `https://github.com/${githubUsername}`;
      } else {
        githubProfileUrl = profile.html_url || '';
      }
    }

    return { githubProfileUrl, githubUsername };
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

        const githubProvider = user.providerData.find(
          (provider) => provider.providerId === 'github.com'
        );

        let githubUsername = '';
        let githubProfileUrl = '';

        if (githubProvider) {
          githubUsername =
            (githubProvider as any).screenName ||
            user.displayName ||
            this.extractUsernameFromEmail(user.email) ||
            '';

          if (githubUsername) {
            githubProfileUrl = `https://github.com/${githubUsername}`;
          }
        }

        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          providerData: user.providerData,
          githubUsername: githubUsername,
          githubProfileUrl: githubProfileUrl,
        };
      })
    );
  }

  private extractUsernameFromEmail(email: string | null): string {
    if (!email) return '';

    if (email.includes('@users.noreply.github.com')) {
      const match = email.match(
        /^(\d+\+)?([^@]+)@users\.noreply\.github\.com$/
      );
      if (match) {
        return match[2];
      }
    }

    return '';
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }
}
