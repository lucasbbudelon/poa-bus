import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppTestingModule } from 'src/app/test/app-testing-module.module';

import { RequestErrorComponent } from './request-error.component';

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
    activeModal = TestBed.inject(NgbActiveModal);
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
