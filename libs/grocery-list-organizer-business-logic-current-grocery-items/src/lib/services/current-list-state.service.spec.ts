import { TestBed } from '@angular/core/testing';

import { CurrentListStateService } from './current-list-state.service';

describe('CurrentListStateService', () => {
  let service: CurrentListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentListStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
