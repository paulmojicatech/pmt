import { TestBed } from '@angular/core/testing';

import { ItemsToGetStateService } from './items-to-get-state.service';

describe('ItemsToGetStateService', () => {
  let service: ItemsToGetStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsToGetStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
