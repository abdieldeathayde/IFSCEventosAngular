import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // ◄ 1. IMPORT DO SEU SERVIÇO (Ajuste o caminho se necessário)

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // ◄ 2. INJEÇÃO DO AUTH SERVICE
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  cadastrar() {
    if (this.registerForm.valid) {
      const dadosUsuario = this.registerForm.value;

      // ◄ 3. DISPARO REAL DA REQUISIÇÃO HTTP POST PARA O SPRING BOOT
      this.authService.registrar(dadosUsuario).subscribe({
        next: (resposta) => {
          console.log("Usuário cadastrado com sucesso no MySQL:", resposta);
          alert("Cadastro realizado com sucesso!");
          
          // Só redireciona após o backend confirmar que salvou no banco
          this.router.navigate(['/login']);
        },
        error: (erro) => {
          console.error("Erro ao salvar no banco de dados:", erro);
          alert("Falha ao realizar cadastro. Verifique se o e-mail já existe.");
        }
      });
    }
  }
}