import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  login(credenciais: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credenciais).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('user_token', response.token);
          localStorage.setItem('user_name', response.nome);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user_token');
  }

  logout(): void {
    localStorage.clear();
  }
}