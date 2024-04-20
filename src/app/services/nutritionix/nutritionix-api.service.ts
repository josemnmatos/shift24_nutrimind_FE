import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NutritionixApiService {
  private apiUrl = 'https://trackapi.nutritionix.com/v2';
  private nplServiceUrl = this.apiUrl + '/natural/nutrients';
  private NUTRITIONIX_APP_ID = environment.NUTRITIONIX_APP_ID;
  private NUTRITIONIX_API_KEY = environment.NUTRITIONIX_API_KEY;

  private headers = {
    'x-app-id': this.NUTRITIONIX_APP_ID,
    'x-app-key': this.NUTRITIONIX_API_KEY,
    'Content-Type': 'application/json',
  };

  constructor(private http: HttpClient) {}

  public getNutritionixData(input: string) {
    return this.http.post(
      this.nplServiceUrl,
      { query: input, timezone: 'Europe/London' },
      { headers: this.headers }
    );
  }
}
