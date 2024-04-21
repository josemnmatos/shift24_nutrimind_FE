import { foodGroups } from '../enums';

export interface MealItem {
  name: string;
  brand: string;
  metadata?: any;
  servingQuantity?: number;
  servingUnit?: string;
  calories: number;
  totalFat: number;
  saturatedFat?: number;
  cholesterol?: number;
  sodium?: number;
  totalCarbohydrate: number;
  dietaryFiber: number;
  sugars?: number;
  protein: number;
  potassium?: number;
  fullNutrients?: any;
  foodGroup: string;
  consumedAt?: Date;
}

export class Convert {
  static toMealItem(json: any): MealItem {
    let foodGroupId = json.tags.food_group;

    return {
      name: json.food_name,
      brand: json.brand_name,
      metadata: json.metadata,
      servingQuantity: json.serving_qty,
      servingUnit: json.serving_unit,
      calories: json.nf_calories,
      totalFat: json.nf_total_fat,
      saturatedFat: json.nf_saturated_fat,
      cholesterol: json.nf_cholesterol,
      sodium: json.nf_sodium,
      totalCarbohydrate: json.nf_total_carbohydrate,
      dietaryFiber: json.nf_dietary_fiber,
      sugars: json.nf_sugars,
      protein: json.nf_protein,
      potassium: json.nf_potassium,
      fullNutrients: json.full_nutrients,
      foodGroup: foodGroups[foodGroupId],
      consumedAt: json.consumed_at ? new Date(json.consumed_at) : undefined,
    };
  }

  static toMealItemFromBE(json: any): MealItem {
    return {
      name: json.name,
      brand: json.brand,
      calories: json.calories,
      totalFat: json.fat,
      totalCarbohydrate: json.carbs,
      dietaryFiber: json.fiber,
      protein: json.protein,
      foodGroup: json.category,
    };
  }
}
