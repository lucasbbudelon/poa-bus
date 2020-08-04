import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ITEMS_PER_PAGE_DEFAULT } from './bus-lines.constants';
import { BusLine, BusLineApi, BusLineData, BusLinePage, BusLineType } from './bus-lines.models';

@Injectable({
  providedIn: 'root',
})
export class BusLinesService {

  private busLines: BusLine[];

  constructor(private httpClient: HttpClient) { }

  getBusLines(page: BusLinePage, filter?: string): Observable<BusLineData> {

    if (this.busLines) {
      const busLines = filter ? this.filterAllByAnyValue(filter) : this.busLines;
      return of(this.loadData(busLines, page));
    }

    const getBusLines = this.httpClient
      .get<BusLineApi[]>(`${environment.api}/php/facades/process.php?a=nc&p=%25&t=${BusLineType.Bus}`)
      .pipe(
        map((busLines) => busLines.map((item) => this.convertModelApi(item, BusLineType.Bus))),
      );

    const getStockingLines = this.httpClient
      .get<BusLineApi[]>(`${environment.api}/php/facades/process.php?a=nc&p=%25&t=${BusLineType.Stocking}`)
      .pipe(
        map((busLines) => busLines.map((item) => this.convertModelApi(item, BusLineType.Stocking))),
      );

    return forkJoin(getBusLines, getStockingLines)
      .pipe(
        map(([busLines, stockingLines]) => busLines.concat(stockingLines)),
        tap((busLines) => this.busLines = this.sortByName(busLines)),
        map((busLines) => this.loadData(busLines, page))
      );
  }

  private convertModelApi(item: BusLineApi, type: BusLineType) {
    return {
      id: item.id,
      code: item.codigo,
      name: item.nome,
      type
    };
  }

  private loadData(busLines: BusLine[], page: BusLinePage): BusLineData {

    const current = page.page ? page.page : 0;
    const limit = page.limit ? page.limit : ITEMS_PER_PAGE_DEFAULT;
    const size = (current - 1) * limit;

    return {
      page,
      items: busLines.slice(size, size + limit),
      totalItems: busLines.length
    };
  }

  private sortByName(busLines: BusLine[]): BusLine[] {
    return busLines.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    })
  }

  private filterAllByAnyValue(term: string) {
    term = term.toLowerCase();
    return this.busLines
      .filter((busLine) =>
        busLine.id.toLowerCase().includes(term) ||
        busLine.code.toLowerCase().includes(term) ||
        busLine.name.toLowerCase().includes(term)
      );
  }
}
