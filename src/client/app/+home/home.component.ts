import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthFormComponent } from './shared/auth-form/index';
import { MemeComponent } from './shared/meme/index';
import { UploaderComponent } from './shared/uploader/index';

@Component({
  selector: 'mt-home',
  moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [
    REACTIVE_FORM_DIRECTIVES,
    AuthFormComponent,
    MemeComponent,
    UploaderComponent
  ]
})
export class HomeComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: any) => {
      console.log('cat', params['category']);
    });
  }
}
