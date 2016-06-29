import { Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import * as Immutable from 'immutable';

@Component({
  selector: 'sd-home',
  moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class HomeComponent {
  public newName: string;

  constructor() {
    let test = Immutable.List<number>([1, 2, 3]);
    console.log(test);
  }
}
