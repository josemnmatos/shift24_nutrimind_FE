import { MealItem } from './meal-item';

export interface MealLog {
  mealType: string;
  mealItems: MealItem[];
}
