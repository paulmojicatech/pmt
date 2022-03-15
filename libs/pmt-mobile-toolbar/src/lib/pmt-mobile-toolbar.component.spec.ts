import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtMobileToolbarComponent } from './pmt-mobile-toolbar.component';

describe('PmtMobileToolbarComponent', () => {
  let component: PmtMobileToolbarComponent;
  let fixture: ComponentFixture<PmtMobileToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmtMobileToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtMobileToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
