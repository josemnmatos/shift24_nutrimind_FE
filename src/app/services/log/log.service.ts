import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { MealItem } from '../../utils/interfaces/meal-item';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  apiEndpoint = environment.API_ENDPOINT;
  constructor(private httpClient: HttpClient, private auth: AuthService) {}

  mealItemBody(item: MealItem) {
    let body = {
      name: item.name,
      description: '',
      category: item.foodGroup,
      brand: item.brand,
      calories: item.calories,
      protein: item.protein,
      fat: item.totalFat,
      carbs: item.totalCarbohydrate,
      vitaminC: 0.0,
      vitaminD: 0.0,
      vitaminE: 0.0,
      calcium: 0.0,
      iron: 0.0,
      iodine: 0.0,
      fiber: 0.0,
    };
    return body;
  }

  createItem(item: MealItem) {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: this.auth.getToken(),
      }),
    };

    return this.httpClient
      .post(
        `${this.apiEndpoint}/api/insert_item/`,
        this.mealItemBody(item),
        requestOptions
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  createMeal(mealType: string, mealItems: MealItem[]) {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: this.auth.getToken(),
      }),
    };

    let mealItemsBody = mealItems.map((item) => this.mealItemBody(item));

    return this.httpClient
      .post(
        `${this.apiEndpoint}/api/insert_meal/`,
        { mealType, mealItems: mealItemsBody },
        requestOptions
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  getDataForToday() {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: this.auth.getToken(),
      }),
    };

    return this.httpClient.get(
      `${this.apiEndpoint}/api/get_today_meals/`,
      requestOptions
    );
  }
}
