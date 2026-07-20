import { TestBed } from '@angular/core/testing';

import { Conteudo } from './conteudo';

describe('Conteudo', () => {
  let service: Conteudo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Conteudo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
