import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { RequestLoadingComponent } from './request-loading.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppTestingModule } from 'src/app/test/app-testing-module.module';
import { NgbActiveModalMock } from 'src/app/test/mocks/ngb-active-modal.mock';

describe('RequestLoadingComponent', () => {
  let component: RequestLoadingComponent;
  let fixture: ComponentFixture<RequestLoadingComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestLoadingComponent],
      imports: [AppTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLoadingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
