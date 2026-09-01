import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// ◄ IMPORTANTE: Importe o ConteudoService E o Conteudo juntos!
// Ajuste o caminho relativo de acordo com a pasta onde o seu service está.
import { ConteudoService, Conteudo } from '../services/conteudo.service'; 

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventoForm!: FormGroup;
  listaEventos: Conteudo[] = [];

  constructor(
    private fb: FormBuilder,
    private conteudoService: ConteudoService
  ) {}

  ngOnInit(): void {
    this.eventoForm = this.fb.group({
      titulo: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      tipo: ['CURSO', [Validators.required]],
      data: ['', [Validators.required]]
    });

    this.carregarEventos();
  }

  carregarEventos(): void {
    // Se no service o método for list(), troque .listar() abaixo por .list()
    this.conteudoService.listarTodos().subscribe({
      next: (dados: Conteudo[]) => {
        this.listaEventos = dados;
        console.log("Dados do MySQL:", this.listaEventos);
      },
      error: (err: any) => console.error("Erro ao carregar:", err)
    });
  }

  cadastrarEvento(): void {
    if (this.eventoForm.valid) {
      this.conteudoService.salvar(this.eventoForm.value).subscribe({
        next: (novoItem: Conteudo) => {
          alert("Conteúdo salvo no MySQL!");
          this.carregarEventos(); 
          this.eventoForm.reset({ tipo: 'CURSO' });
        },
        error: (err: any) => console.error("Erro ao salvar:", err)
      });
    }
  }

  obterCursos(): Conteudo[] {
    return this.listaEventos.filter(item => item.tipo === 'CURSO');
  }

  obterEventos(): Conteudo[] {
    return this.listaEventos.filter(item => item.tipo !== 'CURSO');
  }
}