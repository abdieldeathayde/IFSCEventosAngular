import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  // CORREÇÃO: Removido o arquivo externo e trocado por array vazio inline
  styles: [] 
})
export class AppComponent {
  title = 'adm_ifsc_eventos';
}