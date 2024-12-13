 import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-etudiants',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css',
})
export class EtudiantsComponent implements OnInit {
  etudiants: any[] = [];
  errorMessage: string = '';
  etudiant = {
    code_foner: '',
    nom: '',
    prenoms: '',
    telephone: '',
    email: '',
    datenais: '',
    numeropiece: '',
    ine: '',
    nbaide: '',
    nbpret: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.apiService.getEtudiants(token).subscribe({
        next: (response) => {
          this.etudiants = response.data;
        },
        error: () => {
          this.errorMessage = 'Unable to fetch etudiants. Please login again.';
        },
      });
    } else {
      this.errorMessage = 'No token found. Please login.';
    }
  }

  onSubmit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.createEtudiant(this.etudiant, token).subscribe({
        next: (response) => {
          if (response.success) {
            this.etudiants.push(response.data); // Add new student to the list
            this.etudiant = {
              code_foner: '',
              nom: '',
              prenoms: '',
              telephone: '',
              email: '',
              datenais: '',
              numeropiece: '',
              ine: '',
              nbaide: '',
              nbpret: '',
            }; // Reset the form
          }
        },
        error: (error) => console.error('Error creating student:', error),
      });
    }
  }
}



