import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnChanges {
  title = 'eDoctor';
  notLoggedin = false;
  constructor(private _userservice: UserService) {}

  ngOnInit() {
    //this.notLoggedin = this._userservice.getLogginStatus()
    console.log("On init")
  }

  ngOnChanges(){
    // this.notLoggedin = this._userservice.getLogginStatus();
    console.log("On changes")
  }


}
