import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyFootballSidebarComponent } from './fantasy-football-sidebar.component';

describe('FantasyFootballSidebarComponent', () => {
  let component: FantasyFootballSidebarComponent;
  let fixture: ComponentFixture<FantasyFootballSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FantasyFootballSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FantasyFootballSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
