import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModalMock } from 'src/app/test/mocks/ngb-active-modal.mock';

import { RequestErrorComponent } from './request-error.component';
import { AppTestingModule } from 'src/app/test/app-testing-module.module';

describe('RequestErrorComponent', () => {
  let component: RequestErrorComponent;
  let fixture: ComponentFixture<RequestErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestErrorComponent],
      imports: [AppTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestErrorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
