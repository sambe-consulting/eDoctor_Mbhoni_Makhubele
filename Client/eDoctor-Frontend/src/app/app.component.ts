import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'eDoctor';

  constructor() {}

  ngOnInit() {
   
  }
}
