import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  fazerLogin(): void {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      
      // Simulação de login bem-sucedido
      // Guarda o token fictício para o authGuard liberar o acesso
      localStorage.setItem('user_token', 'token_ficticio_ifsc');
      
      // Redireciona para o Painel Administrativo
      this.router.navigate(['/admin']);
    }
  }
}