import { Component, Input } from '@angular/core';
import { MealLog } from '../utils/interfaces/meal-log';
import { NgFor, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { ColorScheme } from '../utils/color-scheme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faAppleWhole,
  faBottleDroplet,
  faBowlFood,
  faCarrot,
  faCoffee,
  faDrumstickBite,
  faSeedling,
  faUtensils,
  faWheatAwn,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-meal-card',
  standalone: true,
  imports: [NgFor, ProgressBarModule, FontAwesomeModule, TitleCasePipe],
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.scss',
})
export class MealCardComponent {
  @Input() mealLog: MealLog | undefined;
  primaryColor = ColorScheme.primaryColor;
  secondaryColor = ColorScheme.secondaryColor;
  tertiaryColor = ColorScheme.tertiaryColor;
  quaternaryColor = ColorScheme.quaternaryColor;

  faCoffee = faCoffee;

  getTotalCalories(): number {
    let totalCalories = 0;
    if (this.mealLog) {
      this.mealLog.mealItems.forEach((mealItem) => {
        totalCalories += mealItem.calories;
      });
    }
    return Math.round(totalCalories);
  }

  getTotalProtein(): number {
    let totalProtein = 0;
    if (this.mealLog) {
      this.mealLog.mealItems.forEach((mealItem) => {
        totalProtein += mealItem.protein;
      });
    }
    return Math.round(totalProtein);
  }

  getTotalCarbs(): number {
    let totalCarbs = 0;
    if (this.mealLog) {
      this.mealLog.mealItems.forEach((mealItem) => {
        totalCarbs += mealItem.totalCarbohydrate;
      });
    }
    return Math.round(totalCarbs);
  }

  getTotalFat(): number {
    let totalFat = 0;
    if (this.mealLog) {
      this.mealLog.mealItems.forEach((mealItem) => {
        totalFat += mealItem.totalFat;
      });
    }
    return Math.round(totalFat);
  }

  getFoodGroupIcon(foodGroup: string): IconDefinition {
    switch (foodGroup) {
      case 'Dairy':
        return faCoffee;
      case 'Protein':
        return faDrumstickBite;
      case 'Fruit':
        return faAppleWhole;
      case 'Vegetable':
        return faSeedling;
      case 'Grain':
        return faWheatAwn;
      case 'Fat':
        return faBottleDroplet;
      case 'Legume':
        return faCarrot;
      case 'Combination':
        return faBowlFood;
      default:
        return faUtensils;
    }
  }

  constructor() {}
}
