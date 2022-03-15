import { TestBed } from '@angular/core/testing';

import { ItemsToGetUtilService } from './items-to-get-util.service';

describe('ItemsToGetUtilService', () => {
  let service: ItemsToGetUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsToGetUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
