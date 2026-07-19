import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface Conteudo {
  titulo: string;
  tipo: 'curso' | 'evento';
  descricao: string;
  data: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  publicacaoForm!: FormGroup;
  conteudos: Conteudo[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.publicacaoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      tipo: ['curso', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(500)]],
      data: ['', Validators.required]
    });
  }

  publicar(): void {
    if (this.publicacaoForm.valid) {
      const novoConteudo: Conteudo = this.publicacaoForm.value;
      this.conteudos.unshift(novoConteudo); // Adiciona o mais recente no topo
      this.publicacaoForm.reset({ tipo: 'curso' }); // Reseta mantendo o tipo padrão
    }
  }
}