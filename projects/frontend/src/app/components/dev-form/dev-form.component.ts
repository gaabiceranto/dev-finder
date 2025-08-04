import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import {
  FirebaseAuthService,
  FirebaseUser,
} from '../../services/firebase-auth.service';
import { Developer } from '../../models/developer.model';

@Component({
  selector: 'app-dev-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dev-form.component.html',
  styleUrls: ['./dev-form.component.scss'],
})
export class DevFormComponent implements OnInit, OnDestroy {
  developerForm!: FormGroup;
  isLoading = false;
  currentUser: FirebaseUser | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private firebaseAuthService: FirebaseAuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.developerForm = this.fb.group({
      githubUsername: ['', [Validators.required, Validators.minLength(1)]],
      avatarUrl: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      education: ['', [Validators.required, Validators.minLength(2)]],
      technologies: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  private loadCurrentUser(): void {
    this.firebaseAuthService
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.currentUser = user;
        if (user) {
          this.populateFormFromUser(user);
        }
      });
  }

  connectWithGitHub(): void {
    this.isLoading = true;

    this.firebaseAuthService
      .signInWithGitHub()
      .then(() => {
        this.snackBar.open(
          'Login com GitHub realizado com sucesso!',
          'Fechar',
          {
            duration: 3000,
          }
        );
      })
      .catch((error) => {
        console.error('Erro no login:', error);
        this.snackBar.open('Erro ao fazer login com GitHub', 'Fechar', {
          duration: 5000,
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  private populateFormFromUser(user: FirebaseUser): void {
    this.developerForm.patchValue({
      githubUsername: user.displayName || '',
      avatarUrl: user.photoURL || '',
      name: user.displayName || '',
      email: user.email || '',
    });
  }

  onSubmit(): void {
    if (this.developerForm.valid) {
      const formValue = this.developerForm.value;
      const developer: Developer = {
        githubUsername: formValue.githubUsername,
        avatarUrl: formValue.avatarUrl,
        name: formValue.name,
        email: formValue.email,
        city: formValue.city,
        education: formValue.education,
        technologies: formValue.technologies
          .split(',')
          .map((tech: string) => tech.trim()),
        bio: '',
        githubProfile: `https://github.com/${formValue.githubUsername}`,
        createdAt: new Date(),
      };

      console.log('Desenvolvedor a ser cadastrado:', developer);
      this.snackBar.open('Desenvolvedor cadastrado com sucesso!', 'Fechar', {
        duration: 3000,
      });
      this.developerForm.reset();
    } else {
      this.markFormGroupTouched();
      this.snackBar.open(
        'Por favor, preencha todos os campos obrigatórios corretamente',
        'Fechar',
        {
          duration: 3000,
        }
      );
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.developerForm.controls).forEach((key) => {
      const control = this.developerForm.get(key);
      control?.markAsTouched();
    });
  }

  get githubUsernameControl(): AbstractControl {
    return this.developerForm.get('githubUsername')!;
  }

  get isFormValid(): boolean {
    return this.developerForm.valid;
  }
}
