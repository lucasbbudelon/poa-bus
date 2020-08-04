import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';

import { ITEMS_PER_PAGE, ITEMS_PER_PAGE_DEFAULT, PAGINATION_MAX_SIZE } from './bus-lines.constants';
import { BusLineData, BusLineType } from './bus-lines.models';
import { BusLinesService } from './bus-lines.service';

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
  get busLineType() {
    return BusLineType;
  }
  get itemsPerPage() {
    return ITEMS_PER_PAGE;
  }
  get paginationMaxSize() {
    return PAGINATION_MAX_SIZE;
  }

  public formGroup: FormGroup;
  public data: BusLineData;
  public currentPage: number;

  private subscriptions: Subscription;

  constructor(
    private busService: BusLinesService
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
        switchMap((filter) => this.busService
          .getBusLines({ page: 1, limit: this.pageSize.value }, filter))
      )
      .subscribe((data) => this.data = data);

    this.subscriptions.add(searchValueChanges$);
  }

  subscribeToPageSizeChanges() {
    const pageSizeValueChanges$ = this.pageSize.valueChanges
      .pipe(
        switchMap((value) => this.busService
          .getBusLines({ page: this.currentPage, limit: value }))
      )
      .subscribe((data) => this.data = data);

    this.subscriptions.add(pageSizeValueChanges$);
  }

  loadFirstPage() {
    this.currentPage = 0;
    this.loadNextPage();
  }

  loadNextPage() {
    const nextPage = this.currentPage++;
    this.busService
      .getBusLines({ page: nextPage, limit: this.pageSize.value })
      .pipe(
        tap((data) => this.data = data),
        finalize(() => this.currentPage = nextPage)
      )
      .subscribe();
  }
}
