import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-request-loading',
  templateUrl: './request-loading.component.html',
  styleUrls: ['./request-loading.component.scss']
})
export class RequestLoadingComponent {
  constructor(public activeModal: NgbActiveModal) {
  }
  close() {
    this.activeModal.close();
  }
}
