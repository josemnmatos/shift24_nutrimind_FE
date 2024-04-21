import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export const URL_DEFAULT = environment.API_ENDPOINT;

@Injectable({
  providedIn: 'root',
})
export class DataRequestsService {
  constructor(private http: HttpClient) {}

  // get example
  public getData(url: string): Observable<any> {
    return this.http.get(url);
  }

  public sendRangedDateMeals(
    url: string,
    header: any,
    data: any
  ): Observable<any> {
    return this.http.post(url, data, header);
  }
}
