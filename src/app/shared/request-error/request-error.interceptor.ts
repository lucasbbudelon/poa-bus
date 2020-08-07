import { HttpErrorResponse, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, filter } from 'rxjs/operators';

import { RequestErrorComponent } from './request-error.component';

@Injectable({
    providedIn: 'root',
})
export class RequestErrorInterceptor implements HttpInterceptor {

    constructor(private modalService: NgbModal) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next
            .handle(request)
            .pipe(
                filter(response => response.type === HttpEventType.Response),
                catchError((response) => {
                    const requestErrorComponent = this.modalService.open(RequestErrorComponent);
                    requestErrorComponent.componentInstance.response = response;
                    throw new HttpErrorResponse(response);
                })
            );
    }
}
