import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoService } from './conteudo.service';

describe('ConteudoService', () => {
  let component: ConteudoService;
  let fixture: ComponentFixture<ConteudoService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteudoService],
    }).compileComponents();

    fixture = TestBed.createComponent(ConteudoService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
