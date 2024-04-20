import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DataRequestsService, URL_DEFAULT} from "../services/requests/data-requests.service";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CalendarModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  date?: Date[];

  constructor(private dataRequests: DataRequestsService) { }

  ngOnInit(): void {

  }

  public onClose(): void {
    if (this.date) {
      this.dataRequests.sendRangedDateMeals(URL_DEFAULT + '/api/get_meals_filtered/', {
        startDate: this.getConvertedDate(this.date[0]),
        endDate: this.getConvertedDate(this.date[1])
      }).subscribe((response) => {
        console.log(response);
      });
    }
  }

  private getConvertedDate(date: Date): string {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
}
