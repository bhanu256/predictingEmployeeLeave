import { Injectable } from '@angular/core';

import { EmployeeResult } from 'src/app/models/employee-result';

@Injectable({
  providedIn: 'root'
})
export class AnalysisServiceService {
  results: EmployeeResult[] = [
    {id: 1, name: "abc", score: 0.7},
    {id: 2, name: "dgh", score: 0.3},
    {id: 1, name: "abc", score: 0.7},
    {id: 2, name: "dgh", score: 0.3},
    {id: 1, name: "abc", score: 0.7},
    {id: 2, name: "dgh", score: 0.3}
  ];

  constructor() { }

  getResults(): EmployeeResult[] {
    return this.results;
  }
}
