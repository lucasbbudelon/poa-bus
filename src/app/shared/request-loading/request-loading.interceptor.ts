import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize } from 'rxjs/operators';

import { RequestLoadingComponent } from './request-loading.component';

@Injectable({
    providedIn: 'root',
})
export class RequestLoadingInterceptor implements HttpInterceptor {

    constructor(private modalService: NgbModal) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        const requestLoadingComponent = this.modalService.open(RequestLoadingComponent,
            {
                centered: true,
                keyboard: false,
                backdrop: 'static',
                size: 'sm',
            }
        );

        return next
            .handle(request)
            .pipe(
                filter(response => response.type === HttpEventType.Response),
                finalize(() => requestLoadingComponent.componentInstance.activeModal.close())
            );
    }
}
