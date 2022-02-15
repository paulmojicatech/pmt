import { TestBed } from '@angular/core/testing';

import { CurrentGroceryItemsUtilService } from './current-grocery-items-util.service';

describe('CurrentGroceryItemsUtilService', () => {
  let service: CurrentGroceryItemsUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentGroceryItemsUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
