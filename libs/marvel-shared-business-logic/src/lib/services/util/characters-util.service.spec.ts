import { TestBed } from '@angular/core/testing';

import { CharactersUtilService } from './characters-util.service';

describe('CharactersUtilService', () => {
  let service: CharactersUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharactersUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
