import { TestBed } from '@angular/core/testing';

import { ApiOnibus } from './onibus.service';

describe('OnibusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiOnibus = TestBed.get(ApiOnibus);
    expect(service).toBeTruthy();
  });
});
