import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { MealItem } from '../../utils/interfaces/meal-item';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class SpeechToTextService {
  recognition: any;
  isStoppedSpeechRecog = false;
  public text = '';
  private voiceToTextSubject: Subject<string> = new Subject();
  private speakingPaused: Subject<any> = new Subject();
  private tempWords: string = '';
  private nutritionData: MealItem[] = [];

  constructor() {}

  /**
   * @description Function to return observable so voice sample text can be send to input.
   */
  speechInput() {
    return this.voiceToTextSubject.asObservable();
  }

  /**
   * @description Function to initialize voice recognition.
   */
  init() {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-EN';

      this.recognition.addEventListener('result', (e: any) => {
        const transcript = Array.from(e.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('.');
        this.tempWords = transcript;
        this.voiceToTextSubject.next(this.text || transcript);
      });
      return this.initListeners();
    }
    return null;
  }

  /**
   * @description Add event listeners to get the updated input and when stoped
   */
  initListeners() {
    this.recognition.addEventListener('end', (condition: any) => {
      this.recognition.stop();
    });
    return this.speakingPaused.asObservable();
  }

  /**
   * @description Function to mic on to listen.
   */
  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.isActive = true;
        this.recognition.stop();
      } else {
        this.isStoppedSpeechRecog = false;
        this.wordConcat();
        // Checked time with last api call made time so we can't have multiple start action within 200ms for countinious listening
        // Fixed : ERROR DOMException: Failed to execute 'start' on 'SpeechRecognition': recognition has already started.
        if (
          !this.recognition.lastActiveTime ||
          Date.now() - this.recognition.lastActive > 200
        ) {
          this.recognition.start();
          this.recognition.lastActive = Date.now();
        }
      }
      this.voiceToTextSubject.next(this.text);
    });
  }

  /**
   * @description Function to stop recognition.
   */
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();
    this.recognition.isActive = false;
    this.speakingPaused.next('Stopped speaking');
  }

  /**
   * @description Function to reset voice recognition.
   */
  reset() {
    this.text = '';
    this.tempWords = '';
    this.recognition.stop();
  }

  /**
   * @description Merge previous input with latest input.
   */
  wordConcat() {
    this.text = this.text.trim() + ' ' + this.tempWords;
    this.text = this.text.trim();
    this.tempWords = '';
  }
}
