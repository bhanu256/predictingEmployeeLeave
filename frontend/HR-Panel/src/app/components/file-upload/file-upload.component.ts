import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { Router } from '@angular/router';

import { AnalysisServiceService } from 'src/app/services/analysis-service.service';
import { MatSpinner } from '@angular/material/progress-spinner';

import { EmployeeResult } from 'src/app/models/employee-result';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  uploadForm: FormGroup;
  hasBaseDropZoneOver = false;
  selectedFile: File;

  buttonText = "Submit";
  spinnerValue = false;

  results: EmployeeResult[];

  URL = ' http://127.0.0.1:5000/upload';
  uploader: FileUploader = new FileUploader({
    url: this.URL,
    disableMultipart : false,
    autoUpload: false,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['csv', 'xls'],
    headers: [
      {name: 'Access-Control-Allow-Credentials',value: 'true'}
    ],
  });

  @ViewChild('spinner') spinner: MatSpinner;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _service: AnalysisServiceService
  ) { }

  ngOnInit(): void {
    this.uploadForm = this._formBuilder.group(
      {'file': new FormControl(null, Validators.required)}
    );

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); //success server response
    this._router.navigate(['/results'])
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let error = JSON.parse(response); //error server response
  }

  get file(): AbstractControl {
    return this.uploadForm.get('file');
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = true; 
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    this.selectedFile = event[0];
    this.uploader.addToQueue([this.selectedFile]);
  }

  onSubmit() {
    // console.log(this.uploader)
    // // this.uploader.queue[0].upload();
    //   let formData:FormData = new FormData();
    //   formData.append('uploadFile', this.selectedFile, this.selectedFile.name);
    //   let headers = new HttpHeaders();
    //   /** In Angular 5, including the header Content-Type can invalidate your request */
    //   headers.append('Content-Type', 'multipart/form-data');
    //   headers.append('Accept', 'application/json');
    //   // let options = new HttpHeaders([{ headers: headers }]);
    //   this.http.post(this.URL, formData, { headers: headers,}).pipe(
    //       map(res => {}),
    //       catchError(err => {return of('Upload failed');}))
    //       .subscribe(
    //           data => console.log(data),
    //           error => console.log(error)
    //       );
    this.update("Loading", true);
    this._service.getResults().subscribe(
      (response) => {
        this.update("Submit", false);
        this._service.response = response;
        this._router.navigate(['/results'])
      },
      (error) => {
        console.error(error);
      }
    );
  }

  update(but: string, value: boolean) {
    this.buttonText = but;
    this.spinnerValue = value;
  }

}
