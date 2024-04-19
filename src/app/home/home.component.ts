import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { KnobModule } from 'primeng/knob';
import { ColorScheme } from '../utils/color-scheme';
import { MealCardComponent } from '../meal-card/meal-card.component';
import { MealLog } from '../utils/interfaces/meal-log';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChipsModule, FormsModule, KnobModule, MealCardComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  values: string[] | undefined;
  knob1Value!: number;
  knob2Value!: number;
  knob3Value!: number;
  primaryColor = ColorScheme.primaryColor;
  secondaryColor = ColorScheme.secondaryColor;
  tertiaryColor = ColorScheme.tertiaryColor;
  quaternaryColor = ColorScheme.quaternaryColor;

  meals: MealLog[] = [
    {
      mealType: 'Breakfast',
      mealItems: [{ name: 'Banana' }, { name: 'Orange' }, { name: 'Pasta' }],
    },
    {
      mealType: 'Lunch',
      mealItems: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Pasta' }],
    },
    {
      mealType: 'Dinner',
      mealItems: [{ name: 'Apple' }, { name: 'Orange' }, { name: 'Pasta' }],
    },
  ];

  constructor() {}

  ngOnInit() {
    this.values = ['Banana', 'Laranja', 'Massa'];
    this.knob1Value = 0;
    this.knob2Value = 10;
    this.knob3Value = 20;
  }
}
