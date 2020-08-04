import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-request-error',
  templateUrl: './request-error.component.html',
  styleUrls: ['./request-error.component.scss']
})
export class RequestErrorComponent {
  @Input() error: HttpErrorResponse;
  constructor(public activeModal: NgbActiveModal) {
  }
}
