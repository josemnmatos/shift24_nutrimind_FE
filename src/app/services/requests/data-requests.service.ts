import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export const URL_DEFAULT = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class DataRequestsService {

  constructor(private http: HttpClient) { }

  // get example
  public getData(url: string): Observable<any> {
    return this.http.get(url);
  }

  public sendRangedDateMeals(url: string, header: any, data: any): Observable<any> {
    return this.http.post(url, data, header);
  }
}
