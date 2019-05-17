import { TestBed } from '@angular/core/testing';

import { TmijsService } from './tmijs.service';

describe('TmijsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TmijsService = TestBed.get(TmijsService);
    expect(service).toBeTruthy();
  });
});
