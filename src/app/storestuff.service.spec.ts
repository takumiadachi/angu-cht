import { TestBed } from '@angular/core/testing';

import { StorestuffService } from './storestuff.service';

describe('StorestuffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorestuffService = TestBed.get(StorestuffService);
    expect(service).toBeTruthy();
  });
});
