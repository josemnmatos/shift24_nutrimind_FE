import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterBarComponent} from "./footer-bar/footer-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
