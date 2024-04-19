import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChipsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  values: string[] | undefined;
}
