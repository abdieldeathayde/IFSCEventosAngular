import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ConteudoService } from '../../services/conteudo'; 

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  eventoForm!: FormGroup;
  listaConteudos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private conteudoService: ConteudoService
  ) {}

  ngOnInit(): void {
    this.eventoForm = this.fb.group({
      titulo: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      data: ['', [Validators.required]],
      tipo: ['CURSO', [Validators.required]]
    });

    this.carregarConteudos();
  }

  carregarConteudos(): void {
    this.conteudoService.listarTodos().subscribe({
      next: (dados: any) => this.listaConteudos = dados,
      error: (err: any) => console.error('Erro ao buscar dados do banco:', err)
    });
  }

  salvar(): void {
  console.log('Entrou no método salvar');

  if (this.eventoForm.invalid) {
    console.log('Formulário inválido');
    console.log(this.eventoForm.value);
    return;
  }

  console.log('Enviando:', this.eventoForm.value);

  this.conteudoService.salvar(this.eventoForm.value).subscribe({
    next: (res: any) => {
      console.log('Resposta do backend:', res);
    },
    error: (err: any) => {
      console.error('Erro:', err);
    }
  });
}
}