import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyFootballMobileComponent } from './fantasy-football-mobile.component';

describe('FantasyFootballMobileComponent', () => {
  let component: FantasyFootballMobileComponent;
  let fixture: ComponentFixture<FantasyFootballMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FantasyFootballMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FantasyFootballMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
