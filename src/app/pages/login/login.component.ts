import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// ALTERE ESTA LINHA (Linha 5):
import { AuthService } from '../../services/auth.service'; // ◄ Adicione '.service' no caminho

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = ''; // Para exibir erros da API na tela

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // ◄ 2. Injete o Service aqui
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  fazerLogin(): void {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      
      // 3. Dispara a requisição HTTP real para o Spring Boot
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login efetuado com sucesso!', res);
          this.router.navigate(['/admin']); // Redireciona se der bom
        },
        error: (err) => {
          // Captura a mensagem tratada de "E-mail ou senha inválidos" do backend
          this.errorMessage = err.error?.message || 'Erro ao conectar ao servidor.';
        }
      });
    }
  }
}