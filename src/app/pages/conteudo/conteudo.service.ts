import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Conteudo {
  id?: number;
  titulo: string;
  descricao: string;
  tipo: string; // ex: 'CURSO' ou 'EVENTO'
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConteudoService {
  private apiUrl = 'http://localhost:8080/api/conteudos';

  constructor(private http: HttpClient) {}

  // Busca todos os registros salvos no MySQL
  listar(): Observable<Conteudo[]> {
    return this.http.get<Conteudo[]>(this.apiUrl);
  }

  // Envia o novo registro para o Spring Boot persistir no banco
  salvar(conteudo: Conteudo): Observable<Conteudo> {
    return this.http.post<Conteudo>(this.apiUrl, conteudo);
  }
}