import { TestBed } from '@angular/core/testing';

import { AnalysisServiceService } from './analysis-service.service';

describe('AnalysisServiceService', () => {
  let service: AnalysisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
