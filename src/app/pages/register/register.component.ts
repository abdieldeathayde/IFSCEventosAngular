import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  cadastrar(): void {
    if (this.registerForm.valid) {
      const dadosUsuario = this.registerForm.value;
      
      // Aqui você dispararia o serviço para salvar no banco (via Java/Kotlin)
      console.log('Usuário registrado com sucesso:', dadosUsuario);
      
      // Feedback visual simples e redirecionamento
      alert('Cadastro realizado com sucesso! Prossiga para o login.');
      this.router.navigate(['/login']);
    }
  }
}