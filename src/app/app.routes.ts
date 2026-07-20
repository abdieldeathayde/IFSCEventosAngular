import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

// Interface opcional para tipar o modelo de dados no front-end
export interface Conteudo {
  id?: number;
  titulo: string;
  descricao: string;
  data: string;
  tipo: 'CURSO' | 'EVENTO';
}

@Injectable({
  providedIn: 'root'
})
export class ConteudoService {
  // URL apontando diretamente para o seu ConteudoController do Spring Boot
  private apiUrl = 'http://localhost:8080/api/conteudos';

  constructor(private http: HttpClient) {}

  /**
   * Busca todos os eventos e cursos cadastrados no MySQL
   * @returns Um Observable contendo um array de conteúdos
   */
  listarTodos(): Observable<Conteudo[]> {
    return this.http.get<Conteudo[]>(this.apiUrl);
  }

  /**
   * Envia um novo curso ou evento para ser persistido no banco de dados
   * @param conteudo Objeto contendo os dados do formulário
   * @returns Um Observable com o conteúdo salvo e o ID gerado pelo banco
   */
  salvar(conteudo: Conteudo): Observable<Conteudo> {
    return this.http.post<Conteudo>(this.apiUrl, conteudo);
  }
}

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'register', component: RegisterComponent }
];