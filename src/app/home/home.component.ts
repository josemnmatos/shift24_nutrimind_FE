import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  public visible: boolean = false;
  public isUserSpeaking: boolean = false;
  public values: string[] | undefined;
  public searchForm: FormGroup;
  knob1Value!: number;
  knob2Value!: number;
  knob3Value!: number;
  primaryColor = ColorScheme.primaryColor;
  secondaryColor = ColorScheme.secondaryColor;
  tertiaryColor = ColorScheme.tertiaryColor;
  quaternaryColor = ColorScheme.quaternaryColor;

  private nutritionData: MealItem[] = [];

  meals: MealLog[] = [
    {
      mealType: 'Breakfast',
      mealItems: this.nutritionData,
    },
  ];

  constructor(
    private speechToText: SpeechToTextService,
    private nutritionApi: NutritionixApiService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchText: ['', Validators.required],
    });
  }

  updateInputArrayCallback() {
    let inputString = this.searchForm.controls['searchText'].value;
    this.values = inputString.split('.');
  }

  ngOnInit() {
    this.knob1Value = 0;
    this.knob2Value = 10;
    this.knob3Value = 20;
    this.initVoiceInput();
  }

  public openInputDialog(): void {
    this.visible = true;
  }

  getNutritionData(input: string): void {
    console.log(input);
    this.nutritionApi.getNutritionixData(input).subscribe((data: any) => {
      data['foods'].forEach((item: any) => {
        this.nutritionData.push(Convert.toMealItem(item));
      });
    });
    console.log(this.nutritionData);
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.getNutritionData(this.searchForm.controls['searchText'].value);
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
