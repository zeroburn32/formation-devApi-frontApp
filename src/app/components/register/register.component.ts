import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  register() {
    this.apiService.register(this.userData).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful!';
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Registration failed';
      },
    });
  }
}
