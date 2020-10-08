import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http'

import { EmployeeResult } from 'src/app/models/employee-result';

@Injectable({
  providedIn: 'root'
})
export class AnalysisServiceService {
  response: any;

  URL = ' http://127.0.0.1:5000/upload';

  constructor(
    private http: HttpClient
  ) { }

  getResults() {
    return this.http.get(this.URL);
  }
}
