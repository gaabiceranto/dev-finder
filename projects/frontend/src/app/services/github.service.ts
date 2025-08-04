import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  email: string;
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private readonly apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<GitHubUser | null> {
    return this.http.get<GitHubUser>(`${this.apiUrl}/users/${username}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar usuário do GitHub:', error);
        return of(null);
      })
    );
  }

  getUserRepos(username: string): Observable<GitHubRepo[]> {
    return this.http
      .get<GitHubRepo[]>(`${this.apiUrl}/users/${username}/repos`)
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar repositórios do GitHub:', error);
          return of([]);
        })
      );
  }

  getTopLanguages(username: string): Observable<string[]> {
    return this.getUserRepos(username).pipe(
      map((repos: GitHubRepo[]) => {
        const languages = repos
          .map((repo: GitHubRepo) => repo.language)
          .filter(
            (language: string | null) =>
              language !== null && language !== undefined
          );
        return [...new Set(languages)];
      }),
      catchError(() => of([]))
    );
  }
}
