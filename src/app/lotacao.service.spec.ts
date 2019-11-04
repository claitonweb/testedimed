import { TestBed } from '@angular/core/testing';

import { LotacaoService } from './lotacao.service';

describe('LotacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LotacaoService = TestBed.get(LotacaoService);
    expect(service).toBeTruthy();
  });
});
