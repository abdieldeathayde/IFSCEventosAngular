import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Conteudo {
  id?: number;
  titulo: string;
  descricao: string;
  tipo: string;
  data: string;
}


@Injectable({
  providedIn: 'root'
})
export class ConteudoService {

  private apiUrl = 'http://localhost:8080/api/conteudos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Conteudo[]> {
    return this.http.get<Conteudo[]>(this.apiUrl);
  }

  salvar(conteudo: Conteudo): Observable<Conteudo> {
    return this.http.post<Conteudo>(this.apiUrl, conteudo);
  }
}