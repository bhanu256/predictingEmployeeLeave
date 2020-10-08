import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

import { EmployeeResult } from 'src/app/models/employee-result';
import { AnalysisServiceService } from 'src/app/services/analysis-service.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements AfterViewInit {
  result: EmployeeResult[];
  dataSource: MatTableDataSource<EmployeeResult>;
  displayedColumns: string[] = ['id', 'name', 'score'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _analysisService: AnalysisServiceService
  ) {
    this.result = this._analysisService.getResults();
    this.dataSource = new MatTableDataSource(this.result);
   }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    console.log(this.result, this.dataSource)
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort): void {
    const data = this.result.slice();
    if (!sort.active || sort.direction === '') {
      this.result = data;
      return;
    }

    this.result = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Name': return compare(a.name, b.name, isAsc);
        case 'Id': return compare(a.id, b.id, isAsc);
        case 'Score': return compare(a.score, b.score, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
