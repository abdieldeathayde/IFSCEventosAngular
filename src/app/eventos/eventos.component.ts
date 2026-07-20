import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface que define o formato dos dados recebidos
export interface Atividade {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  tipo: 'CURSO' | 'EVENTO';
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  
  // Lista que armazenará os dados recebidos da API
  listaAtividades: Atividade[] = [];

  ngOnInit(): void {
    // Simulando o consumo dos dados enviados anteriormente
    this.listaAtividades = [
      {
        id: 1,
        titulo: "Curso Angular",
        descricao: "Aprenda Angular",
        data: "2026-07-20",
        tipo: "CURSO"
      },
      {
        id: 2,
        titulo: "Workshop de Java e Spring",
        descricao: "Aprenda APIs RESTful na prática",
        data: "2026-07-25",
        tipo: "EVENTO"
      }
    ];
  }

  // Método auxiliar para formatar a exibição da badge/tag
  obterClasseTipo(tipo: 'CURSO' | 'EVENTO'): string {
    return tipo === 'CURSO' ? 'badge-curso' : 'badge-evento';
  }
}