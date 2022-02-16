import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtSimpleFormComponent } from './pmt-simple-form.component';

describe('PmtSimpleFormComponent', () => {
  let component: PmtSimpleFormComponent;
  let fixture: ComponentFixture<PmtSimpleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmtSimpleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtSimpleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
