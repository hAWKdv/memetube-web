import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideStore } from '@ngrx/store';

import { userReducer } from './reducers/user.reducer';
import { memesReducer } from './reducers/memes.reducer';
import { categoriesReducer } from './reducers/categories.reducer';

import { UserModel } from './models/user.model';
import { MemeModel } from './models/meme.model';
import { CategoryModel } from './models/category.model';

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
    }),
    UserModel,
    MemeModel,
    CategoryModel
  ]
})
export class AppComponent {}
