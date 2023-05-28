import { Component } from '@angular/core';
import { fadeInOut } from './route.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[fadeInOut]
})
export class AppComponent {
  title = 'Frontend';
}
