import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";

export const FOOTER_BAR_COMPONENTS = {
  HOME: 'home',
  HISTORY: 'history',
  CHATBOT: 'chatbot'
}

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.scss'
})
export class FooterBarComponent implements OnInit {

  public currentRoute?: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.currentRoute = this.router.url.split('/')[1];
    });
  }

  public changeMenu(selectedFooter: string): void {
    switch (selectedFooter) {
      case FOOTER_BAR_COMPONENTS.HOME: {
        this.currentRoute = selectedFooter;
        this.router.navigate(['home']);
        return;
      }
      case FOOTER_BAR_COMPONENTS.HISTORY: {
        this.currentRoute = selectedFooter;
        this.router.navigate(['history']);
        return;
      }
      case FOOTER_BAR_COMPONENTS.CHATBOT: {
        this.currentRoute = selectedFooter;
        this.router.navigate(['chatbot']);
        return;
      }
      default: {
        this.router.navigate(['home']);
        break;
      }
    }
  }

  protected readonly FOOTER_BAR_COMPONENTS = FOOTER_BAR_COMPONENTS;
}
