import { TestBed } from '@angular/core/testing';

import { ConteudoService } from '../services/conteudo.service';

describe('ConteudoService', () => {
  let service: ConteudoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConteudoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
