import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FooterBarComponent} from "./footer-bar/footer-bar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterBarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  public isLoggedIn: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (localStorage.getItem('token')) {
        this.isLoggedIn = true;
        this.router.navigate(['home']);
      } else {
        this.isLoggedIn = false;
        this.router.navigate(['auth']);
      }
    });
  }
}
