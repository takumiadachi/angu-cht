import { TestBed } from '@angular/core/testing';

import { TwitchapiService } from './twitchapi.service';

describe('TwitchapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwitchapiService = TestBed.get(TwitchapiService);
    expect(service).toBeTruthy();
  });
});
