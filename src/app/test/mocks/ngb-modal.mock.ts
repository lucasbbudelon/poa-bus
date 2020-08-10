import { NgbActiveModalMock } from './ngb-active-modal.mock';

export class NgbModalMock {
  open = jest.fn().mockReturnValue({
    componentInstance: {
      activeModal: new NgbActiveModalMock()
    }
  });
}
