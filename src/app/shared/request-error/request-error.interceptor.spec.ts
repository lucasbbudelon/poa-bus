import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalMock } from 'src/app/test/mocks/ngb-modal.mock';

import { RequestErrorComponent } from './request-error.component';
import { RequestErrorInterceptor } from './request-error.interceptor';

describe('RequestErrorInterceptor', () => {
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;
    let modalService: NgbModal;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: NgbModal, useClass: NgbModalMock },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RequestErrorInterceptor,
                    multi: true,
                },
            ],
            imports: [HttpClientTestingModule],
        });

        httpClient = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);

        modalService = TestBed.inject(NgbModal);
    });

    describe('should an integration error occurs with the backend', () => {

        it('should show error modal', () => {
            httpClient.get<any>('http://www.test.com').subscribe();

            httpMock.expectOne('http://www.test.com').flush('Error', {
                status: 500,
                statusText: 'InternalServerError',
            });

            expect(modalService.open).toHaveBeenCalledWith(RequestErrorComponent);
        });
    });
});
