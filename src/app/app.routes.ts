import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ChatbotComponent} from './chatbot/chatbot.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {HistoryComponent} from "./history/history.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // default route
  //{ path: '**', redirectTo: 'home' }, // if route doesn't exist then redirect to home
  { path: 'home', component: HomeComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'auth', component: AuthenticationComponent },
];
