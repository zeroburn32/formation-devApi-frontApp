import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Register method
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Get Etudiants (secured)
  getEtudiants(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/etudiants`, { headers });
  }

  createEtudiant(etudiant: any, token: string): Observable<any> {
     const headers = new HttpHeaders({
       Authorization: `Bearer ${token}`,
     });
    return this.http.post(`${this.apiUrl}/etudiants`, etudiant, { headers });
  }
}
