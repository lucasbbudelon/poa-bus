import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DomSanitizerMock } from './mocks/dom-sanitizer.mock';
import { HttpClientMock } from './mocks/http-client.mock';
import { NgbActiveModalMock } from './mocks/ngb-active-modal.mock';
import { NgbModalMock } from './mocks/ngb-modal.mock';

@NgModule({
    declarations: [],

    exports: [
        // angular
        CommonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,

        // ng-bootstrap
        NgbModule
    ],
    providers: [
        // angular
        { provide: HttpClient, useClass: HttpClientMock },
        { provide: DomSanitizer, useClass: DomSanitizerMock },

        // ng-bootstrap
        { provide: NgbModal, useClass: NgbModalMock },
        { provide: NgbActiveModal, useClass: NgbActiveModalMock },
    ],
})
export class AppTestingModule { }
