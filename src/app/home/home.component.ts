import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { KnobModule } from 'primeng/knob';
import { ColorScheme } from '../utils/color-scheme';
import { MealCardComponent } from '../meal-card/meal-card.component';
import { MealLog } from '../utils/interfaces/meal-log';
import { NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SpeechToTextService } from '../services/speech-to-text/speech-to-text.service';
import { NutritionixApiService } from '../services/nutritionix/nutritionix-api.service';
import { Convert, MealItem } from '../utils/interfaces/meal-item';
import { LogService } from '../services/log/log.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ChipsModule,
    FormsModule,
    KnobModule,
    MealCardComponent,
    NgFor,
    ButtonModule,
    DialogModule,
    NgIf,
  ],
  providers: [SpeechToTextService, NutritionixApiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterContentChecked {
  public visible: boolean = false;
  public isUserSpeaking: boolean = false;
  public chipValues: string[] | undefined;
  public searchForm: FormGroup;
  primaryColor = ColorScheme.primaryColor;
  secondaryColor = ColorScheme.secondaryColor;
  tertiaryColor = ColorScheme.tertiaryColor;
  quaternaryColor = ColorScheme.quaternaryColor;
  totalDailyCalories: number | undefined;
  caloriesTargetValue: number = 2000;
  proteinsTargetValue: number = 50;
  fatsTargetValue: number = 50;
  carbsTargetValue: number = 50;

  private nutritionData: MealItem[] = [];

  public dayItemsByMealType: Map<string, MealItem[]> = new Map<
    string,
    MealItem[]
  >();

  constructor(
    private speechToText: SpeechToTextService,
    private nutritionApi: NutritionixApiService,
    private fb: FormBuilder,
    private logService: LogService,
    private cdref: ChangeDetectorRef
  ) {
    this.searchForm = this.fb.group({
      searchText: ['', Validators.required],
    });
  }

  updateInputArrayCallback() {
    let inputString = this.searchForm.controls['searchText'].value;
    this.chipValues = inputString.split('.');
  }

  ngOnInit() {
    this.initVoiceInput();

    this.logService.getDataForToday().subscribe((data: any) => {
      for (let mealType in data) {
        let mealDetails = data[mealType];

        let mealItems = mealDetails['mealList'];

        this.dayItemsByMealType.set(mealType, []);

        mealItems.forEach((item: any) => {
          let convertedItem: MealItem = Convert.toMealItemFromBE(item);
          this.dayItemsByMealType.get(mealType)?.push(convertedItem);
        });
      }
    });

    this.cdref.detectChanges();

    setTimeout(() => {
      this.totalDailyCalories = this.getDailyCalories();
    }, 500);
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  public getAllItems(): MealItem[] {
    let allItems: MealItem[] = [];

    for (let entry of this.dayItemsByMealType.entries()) {
      let mealItems = entry[1];
      mealItems.forEach((item) => {
        allItems.push(item);
      });
    }

    return allItems;
  }

  public getDailyCalories(): number {
    let totalCalories = 0;

    let allItems = this.getAllItems();

    allItems.forEach((item) => {
      totalCalories += item.calories;
    });

    return totalCalories;
  }

  public getDailyProtein(): number {
    let totalProtein = 0;

    let allItems = this.getAllItems();

    allItems.forEach((item) => {
      totalProtein += item.protein;
    });

    return totalProtein;
  }

  public getDailyCarbs(): number {
    let totalCarbs = 0;

    let allItems = this.getAllItems();

    allItems.forEach((item) => {
      totalCarbs += item.totalCarbohydrate;
    });

    return totalCarbs;
  }

  public getDailyFat(): number {
    let totalFat = 0;

    let allItems = this.getAllItems();

    allItems.forEach((item) => {
      totalFat += item.totalFat;
    });

    return totalFat;
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

  public openInputDialog(): void {
    this.visible = true;
    //reset the form
    this.searchForm.reset();
    //reset the voice input
    this.stopRecording();
    this.chipValues = [];
    this.speechToText.reset();
  }

  getNutritionData(input: string): void {
    this.nutritionApi.getNutritionixData(input).subscribe((data: any) => {
      let itemsByMealType: any = {};

      data['foods'].forEach((item: any) => {
        let convertedItem: MealItem = Convert.toMealItem(item);
        this.nutritionData.push(convertedItem);

        //decide mealType based on time of day
        let mealTime = convertedItem.consumedAt?.getHours();
        let mealType = 'Other';

        if (mealTime && mealTime >= 7 && mealTime < 11) {
          mealType = 'Breakfast';
        } else if (mealTime && mealTime >= 11 && mealTime < 15) {
          mealType = 'Lunch';
        } else if (mealTime && mealTime >= 15 && mealTime < 18) {
          mealType = 'Snack';
        } else if (mealTime && mealTime >= 18 && mealTime < 22) {
          mealType = 'Dinner';
        } else {
          mealType = 'Other';
        }

        if (!itemsByMealType[mealType]) {
          itemsByMealType[mealType] = [];
        }

        itemsByMealType[mealType].push(convertedItem);

        //save to module variable
        if (!this.dayItemsByMealType.get(mealType)) {
          this.dayItemsByMealType.set(mealType, []);
        }

        this.dayItemsByMealType.get(mealType)?.push(convertedItem);
      });

      for (let mealType in itemsByMealType) {
        this.logService.createMeal(mealType, itemsByMealType[mealType]);
      }
    });
  }

  onSubmit(): void {
    console.log(this.chipValues);

    if (this.searchForm.valid) {
      this.getNutritionData(this.chipValues?.join('.')!);
    }

    if (this.isUserSpeaking) {
      this.stopRecording();
    }

    this.visible = false;
    this.searchForm.reset();
  }

  /**
   * @description Function for initializing voice input so user can chat with machine.
   */
  initVoiceInput() {
    // Subscription for initializing and this will call when user stopped speaking.
    if (typeof this.speechToText !== 'undefined') {
      this.speechToText.init()?.subscribe(() => {
        // User has stopped recording
        // Do whatever when mic finished listening
      });

      // Subscription to detect user input from voice to text.
      this.speechToText.speechInput().subscribe((input) => {
        // Set voice text output to
        // Set voice text output to
        this.searchForm.controls['searchText'].setValue(input);
        this.updateInputArrayCallback();
      });
    }
  }

  /**
   * @description Function to enable voice input.
   */
  startRecording() {
    this.isUserSpeaking = true;
    this.speechToText.start();
  }

  /**
   * @description Function to stop recording.
   */
  stopRecording() {
    this.speechToText.stop();
    this.isUserSpeaking = false;
  }
}
