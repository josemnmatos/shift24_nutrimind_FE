export interface MealHistoric {
  [date: string]: {
    calories: number;
    carbs: number;
    fat: number;
    protein: number;
  }
}
