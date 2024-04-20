import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ChipsModule} from 'primeng/chips';
import {KnobModule} from 'primeng/knob';
import {ColorScheme} from '../utils/color-scheme';
import {MealCardComponent} from '../meal-card/meal-card.component';
import {MealLog} from '../utils/interfaces/meal-log';
import {NgFor, NgIf} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChipsModule, FormsModule, KnobModule, MealCardComponent, NgFor, ButtonModule, DialogModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public visible: boolean = false;
  public isUserSpeaking: boolean = false;
  public values: string[] | undefined;
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
    this.values = ['I had a banana and a butter sandwich with grapes I had a banana and a butter sandwich with grapes', 'Laranja', 'Massa'];
    this.knob1Value = 0;
    this.knob2Value = 10;
    this.knob3Value = 20;
  }

  public openInputDialog(): void {
    this.visible = true;
  }

  onSubmit(input: string): void {
    //this.getNutritionData(this.searchForm.controls['searchText'].value);
  }

  /**
   * @description Function to enable voice input.
   */
  startRecording() {
    this.isUserSpeaking = true;
    //this.voiceRecognition.start();
  }

  /**
   * @description Function to stop recording.
   */
  stopRecording() {
    //this.voiceRecognition.stop();
    this.isUserSpeaking = false;
  }
}
