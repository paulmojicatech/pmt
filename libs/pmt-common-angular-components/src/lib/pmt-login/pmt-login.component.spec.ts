import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtLoginComponent } from './pmt-login.component';

describe('PmtLoginComponent', () => {
  let component: PmtLoginComponent;
  let fixture: ComponentFixture<PmtLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmtLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
