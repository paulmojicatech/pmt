import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarvelToolbarComponent } from './marvel-toolbar.component';

describe('MarvelToolbarComponent', () => {
  let component: MarvelToolbarComponent;
  let fixture: ComponentFixture<MarvelToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarvelToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarvelToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
