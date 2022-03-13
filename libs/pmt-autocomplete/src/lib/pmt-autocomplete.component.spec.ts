import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtAutocompleteComponent } from './pmt-autocomplete.component';

describe('PmtAutocompleteComponent', () => {
  let component: PmtAutocompleteComponent;
  let fixture: ComponentFixture<PmtAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmtAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
