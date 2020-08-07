import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModalMock } from 'src/app/test/mocks/ngb-active-modal.mock';

import { RequestErrorComponent } from './request-error.component';
import { AppTestingModule } from 'src/app/test/app-testing-module.module';
import { By } from '@angular/platform-browser';

describe('RequestErrorComponent', () => {
  let component: RequestErrorComponent;
  let fixture: ComponentFixture<RequestErrorComponent>;
  let activeModal: NgbActiveModal;

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
    activeModal = TestBed.get(NgbActiveModal);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    fixture.debugElement.nativeElement.querySelector('button.close').click();
    expect(activeModal.close).toHaveBeenCalled();
  });
});
