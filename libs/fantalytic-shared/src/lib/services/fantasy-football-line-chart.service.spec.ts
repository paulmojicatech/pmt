import { TestBed } from '@angular/core/testing';

import { FantasyFootballLineChartService } from './fantasy-football-line-chart.service';

describe('FantasyFootballLineChartService', () => {
  let service: FantasyFootballLineChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FantasyFootballLineChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
