import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CalendarModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  date: Date;
  faCalendar = faCalendar;

  constructor() {
    this.date = new Date();
  }
}
