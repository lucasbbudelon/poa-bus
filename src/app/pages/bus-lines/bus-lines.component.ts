import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';

import { ITEMS_PER_PAGE, ITEMS_PER_PAGE_DEFAULT, MODAL_ITINERARY_OPTIONS, PAGINATION_MAX_SIZE } from './bus-lines.constants';
import { BusLine, BusLineData, BusLinePage } from './bus-lines.models';
import { BusLinesService } from './bus-lines.service';
import { BusLinesItineraryComponent } from './components/bus-lines-itinerary/bus-lines-itinerary.component';

@Component({
  selector: 'app-bus-lines',
  templateUrl: './bus-lines.component.html',
  styleUrls: ['./bus-lines.component.scss'],
})
export class BusLinesComponent implements OnInit, OnDestroy {
  get search(): AbstractControl {
    return this.formGroup.get('search');
  }
  get pageSize(): AbstractControl {
    return this.formGroup.get('pageSize');
  }
  get itemsPerPage() {
    return ITEMS_PER_PAGE;
  }
  get paginationMaxSize() {
    return PAGINATION_MAX_SIZE;
  }
  get firstPage(): BusLinePage {
    return { current: 1, limit: this.pageSize.value };
  }
  get nextPage(): BusLinePage {
    return { current: this.currentPage++, limit: this.pageSize.value };
  }

  public formGroup: FormGroup;
  public data: BusLineData;
  public currentPage: number;

  private subscriptions: Subscription;

  constructor(
    private busLinesService: BusLinesService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadFirstPage();
  }

  ngOnDestroy() {
    if (this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  buildForm() {
    this.formGroup = new FormGroup({
      search: new FormControl(null),
      pageSize: new FormControl(ITEMS_PER_PAGE_DEFAULT),
    });

    this.subscriptions = new Subscription();
    this.subscribeToSearchChanges();
    this.subscribeToPageSizeChanges();
  }

  subscribeToSearchChanges() {
    const searchValueChanges$ = this.search.valueChanges
      .pipe(
        switchMap((filter) => this.busLinesService
          .getBusLines(this.firstPage, filter))
      )
      .subscribe((data) => this.data = data);

    this.subscriptions.add(searchValueChanges$);
  }

  subscribeToPageSizeChanges() {
    const pageSizeValueChanges$ = this.pageSize.valueChanges
      .pipe(
        switchMap((value) => this.busLinesService
          .getBusLines({ current: this.currentPage, limit: value }))
      )
      .subscribe((data) => this.data = data);

    this.subscriptions.add(pageSizeValueChanges$);
  }

  loadFirstPage() {
    this.busLinesService
      .getBusLines(this.firstPage)
      .pipe(
        tap((data) => this.data = data),
        tap((data) => this.currentPage = data.page.current),
      )
      .subscribe();
  }

  loadNextPage() {
    this.busLinesService
      .getBusLines(this.nextPage)
      .pipe(
        tap((data) => this.data = data),
        tap((data) => this.currentPage = data.page.current),
      )
      .subscribe();
  }

  openItinerary(busLine: BusLine) {
    this.busLinesService
      .getItinerary(busLine)
      .subscribe((itinerary) => {
        const busLinesItineraryComponent = this.modalService.open(BusLinesItineraryComponent, MODAL_ITINERARY_OPTIONS);
        busLinesItineraryComponent.componentInstance.itinerary = itinerary;
      });
  }
}
