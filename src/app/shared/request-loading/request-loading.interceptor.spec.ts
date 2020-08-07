import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModalMock } from 'src/app/test/mocks/ngb-active-modal.mock';
import { NgbModalMock } from 'src/app/test/mocks/ngb-modal.mock';

import { RequestLoadingComponent } from './request-loading.component';
import { LOADING_OPTIONS } from './request-loading.constants';
import { RequestLoadingInterceptor } from './request-loading.interceptor';

describe('RequestLoadingInterceptor', () => {
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;
    let modalService: NgbModal;
    let activeModal: NgbActiveModal;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: NgbModal, useClass: NgbModalMock },
                { provide: NgbActiveModal, useClass: NgbActiveModalMock },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RequestLoadingInterceptor,
                    multi: true,
                },
            ],
            imports: [HttpClientTestingModule],
        });

        httpClient = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);

        modalService = TestBed.get(NgbModal);
        activeModal = TestBed.get(NgbActiveModal);
    });

    describe('should a request backend', () => {
        it('should show loader', () => {
            httpClient
                .get<any>('http://www.test.com')
                .subscribe(() => {
                    expect(modalService.open).toHaveBeenCalledWith(RequestLoadingComponent, LOADING_OPTIONS);
                    expect(activeModal.close).toHaveBeenCalled();
                });
        });
    });
});
