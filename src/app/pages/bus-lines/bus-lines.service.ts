import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ITEMS_PER_PAGE_DEFAULT } from './bus-lines.constants';
import {
  BusLine,
  BusLineData,
  BusLineItinerary,
  BusLineItineraryLocation,
  BusLinePage,
  BusLineType,
} from './bus-lines.models';

@Injectable({
  providedIn: 'root',
})
export class BusLinesService {

  busLines: BusLine[];

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  getBusLines(page: BusLinePage, filter?: string): Observable<BusLineData> {

    if (this.busLines) {
      const busLines = filter ? this.filterBusLinesByAnyValue(filter) : this.busLines;
      return of(this.loadBusLinesData(busLines, page));
    }

    const getBusLines = this.httpClient
      .get<any[]>(`${environment.apiDataPoa}/php/facades/process.php?a=nc&p=%25&t=${BusLineType.Bus}`)
      .pipe(
        map((busLines) => busLines.map((item) => this.mapBusLine(item, BusLineType.Bus))),
      );

    const getStockingLines = this.httpClient
      .get<any[]>(`${environment.apiDataPoa}/php/facades/process.php?a=nc&p=%25&t=${BusLineType.Stocking}`)
      .pipe(
        map((busLines) => busLines.map((item) => this.mapBusLine(item, BusLineType.Stocking))),
      );

    return forkJoin([getBusLines, getStockingLines])
      .pipe(
        map(([busLines, stockingLines]) => busLines.concat(stockingLines)),
        tap((busLines) => this.busLines = this.sortBusLinesByName(busLines)),
        map((busLines) => this.loadBusLinesData(busLines, page)),
      );
  }

  getItinerary(busLine: BusLine): Observable<BusLineItinerary> {
    return this.httpClient
      .get<any>(`${environment.apiDataPoa}/php/facades/process.php?a=il&p=${busLine.id}`)
      .pipe(
        map((itinerary) => this.mapItinerary(itinerary, busLine.type)),
      );
  }

  private mapBusLine(modelApi: any, type: BusLineType): BusLine {
    return {
      id: modelApi.id || modelApi.idlinha,
      code: modelApi.codigo,
      name: modelApi.nome,
      type
    };
  }

  private mapItinerary(modelApi: any, type: BusLineType): BusLineItinerary {
    return {
      busLine: this.mapBusLine(modelApi, type),
      locations: this.mapLocations(modelApi)
    };
  }

  private mapLocations(modelApi: any): Location[] {
    const locations = Object
      .keys(modelApi)
      .filter((locationIndex) => locationIndex.match(/^[0-9]+$/) != null);

    return locations
      .map((locationIndex) => ({
        ...modelApi[locationIndex],
        order: parseInt(locationIndex, 10),
        urlMap: this.getUrlMapLocation(modelApi[locationIndex])
      }));
  }

  private loadBusLinesData(busLines: BusLine[], page: BusLinePage): BusLineData {

    const size = (page.current - 1) * page.limit;

    return {
      page,
      items: busLines.slice(size, size + page.limit),
      totalItems: busLines.length
    };
  }

  private sortBusLinesByName(busLines: BusLine[]): BusLine[] {
    return busLines.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  private filterBusLinesByAnyValue(term: string) {
    term = term.toLowerCase();
    return this.busLines
      .filter((busLine) =>
        busLine.id.toLowerCase().includes(term) ||
        busLine.code.toLowerCase().includes(term) ||
        busLine.name.toLowerCase().includes(term)
      );
  }

  private getUrlMapLocation(location: BusLineItineraryLocation) {
    const q = `q=${location.lat},${location.lng}`;
    const zoom = 'z=20';
    const output = 'output=embed';
    const url = `${environment.apiGoogleMaps}/maps?${q}&${zoom}&${output}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
