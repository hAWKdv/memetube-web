import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideStore } from '@ngrx/store';

import {userReducer} from './reducers/user.reducer';
import {memesReducer} from './reducers/memes.reducer';
import {categoriesReducer} from './reducers/categories.reducer';

@Component({
  selector: 'sd-app',
  moduleId: module.id,
  viewProviders: [HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    provideStore({
      user: userReducer,
      memes: memesReducer,
      categories: categoriesReducer
    })
  ]
})
export class AppComponent {}
