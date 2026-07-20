import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// Subindo dois níveis (../../) até a pasta app/ para encontrar a pasta services
import { ConteudoService } from '../../services/conteudo';// Mantenha o caminho de acordo com a sua estrutura de pastas

// Definição local do tipo Conteudo caso não seja exportado pelo serviço
interface Conteudo {
  id?: number;
  titulo: string;
  descricao: string;
  tipo: string;
  data: string;
}

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
    // Inicializa o formulário com os validadores
    this.eventoForm = this.fb.group({
      titulo: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      tipo: ['CURSO', [Validators.required]],
      data: ['', [Validators.required]]
    });

    // Carrega os dados persistidos do banco assim que a tela é montada
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.conteudoService.listarTodos().subscribe({
      next: (dados: Conteudo[]) => { // ◄ Tipado para evitar erro TS7006
        this.listaEventos = dados; 
        console.log("Dados carregados da API:", this.listaEventos);
      },
      error: (err: any) => console.error("Erro ao carregar lista:", err)
    });
  }

  cadastrarEvento(): void {
    if (this.eventoForm.valid) {
      this.conteudoService.salvar(this.eventoForm.value).subscribe({
        next: (novoItem: Conteudo) => { // ◄ Tipado para evitar erro TS7006
          alert("Conteúdo salvo com sucesso no MySQL!");
          
          // Atualiza a lista na tela imediatamente recarregando do banco
          this.carregarEventos(); 
          
          // Reseta o formulário mantendo o valor padrão 'CURSO'
          this.eventoForm.reset({ tipo: 'CURSO' });
        },
        error: (err: any) => console.error("Erro ao salvar:", err)
      });
    }
  }
}