import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ConteudoService } from '../services/conteudo.service'; 

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

  if (this.eventoForm.invalid) {
    return;
  }

  this.conteudoService.salvar(this.eventoForm.value).subscribe({
    next: (res) => {

      console.log('Salvo:', res);

      // Atualiza a lista
      this.carregarConteudos();

      // Limpa o formulário
      this.eventoForm.reset({
        tipo: 'CURSO'
      });

    },
    error: (err) => console.error(err)
  });

}
}