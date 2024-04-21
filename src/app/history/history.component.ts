import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import {
  DataRequestsService,
  URL_DEFAULT,
} from '../services/requests/data-requests.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MealHistoric } from '../utils/interfaces/meal-historic';
import { KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { KnobModule } from 'primeng/knob';
import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    NgForOf,
    KeyValuePipe,
    NgIf,
    KnobModule,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  date?: Date[];
  historic?: MealHistoric;
  noData: boolean = false;
  caloriesTargetValue: number = 1000;
  proteinsTargetValue: number = 40;
  fatsTargetValue: number = 40;
  carbsTargetValue: number = 200;

  constructor(
    private dataRequests: DataRequestsService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getTargetValue();
  }

  getTargetValue() {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token') || '',
      }),
    };
    this.http
      .get('http://localhost:8000/api/get_daily_intake/', requestOptions)
      .subscribe((data) => {
        //data comes as {conversation_id: '0'}
        //store in local storage
        console.log(data);
        this.caloriesTargetValue = (data as any)['calories'];
        this.proteinsTargetValue = (data as any)['protein'];
        this.fatsTargetValue = (data as any)['fat'];
        this.carbsTargetValue = (data as any)['carbs'];
      });
  }

  getKnobValue(valueName: string, value: number): number {
    switch (valueName) {
      case 'calories':
        if (value > this.caloriesTargetValue) {
          return this.caloriesTargetValue;
        }
        return value;
      case 'protein':
        if (value > this.proteinsTargetValue) {
          return this.proteinsTargetValue;
        }
        return value;
      case 'fats':
        if (value > this.fatsTargetValue) {
          return this.fatsTargetValue;
        }
        return value;
      case 'carbs':
        if (value > this.carbsTargetValue) {
          return this.carbsTargetValue;
        }
        return value;
      default:
        return 0;
    }
  }

  public onClose(): void {
    if (this.date) {
      const requestOptions = {
        headers: new HttpHeaders({
          Authorization: this.authService.getToken(),
        }),
      };

      this.dataRequests
        .sendRangedDateMeals(
          URL_DEFAULT + '/api/get_meals_filtered/',
          requestOptions,
          {
            startDate: this.getConvertedDate(this.date[0]),
            endDate: this.getConvertedDate(this.date[1]),
          }
        )
        .subscribe((response: MealHistoric) => {
          if (
            Object.keys(response).length === 0 &&
            response.constructor === Object
          ) {
            this.noData = true;
          } else {
            this.historic = response;
            this.noData = false;
          }
        });
    }
  }

  public onClear(): void {
    this.historic = undefined;
  }

  private getConvertedDate(date: Date): string {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  }
}
