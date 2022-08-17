import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyFootballComponent } from './fantasy-football.component';

describe('FantasyFootballComponent', () => {
  let component: FantasyFootballComponent;
  let fixture: ComponentFixture<FantasyFootballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FantasyFootballComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FantasyFootballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
