import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestErrorComponent } from './shared/request-error/request-error.component';
import { RequestErrorInterceptor } from './shared/request-error/request-error.interceptor';
import { RequestLoadingComponent } from './shared/request-loading/request-loading.component';
import { RequestLoadingInterceptor } from './shared/request-loading/request-loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RequestErrorComponent,
    RequestLoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestLoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
