import { TestBed } from '@angular/core/testing';

import { PessoaServico } from './pessoa-servico';

describe('PessoaServico', () => {
  let service: PessoaServico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoaServico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
