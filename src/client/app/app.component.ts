import { Component, provide } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS, AuthConfig, AuthHttp } from 'angular2-jwt/angular2-jwt';
import { provideStore } from '@ngrx/store';
import { Config } from './config/config';
import { Storage } from './utils/storage';
import { AuthService } from './auth/auth.service';

import { userReducer } from './reducers/user.reducer';
import { memesReducer } from './reducers/memes.reducer';
import { categoriesReducer } from './reducers/categories.reducer';

import { UserModel } from './models/user.model';
import { MemeModel } from './models/meme.model';
import { CategoryModel } from './models/category.model';

@Component({
  selector: 'sd-app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HTTP_PROVIDERS,
    AUTH_PROVIDERS,
    provideStore({
      user: userReducer,
      memes: memesReducer,
      categories: categoriesReducer
    }),
    provide(AuthConfig, {
      useValue: new AuthConfig({
        noJwtError: 'No JWT',
        tokenName: Config.AUTH_TOKEN,
        tokenGetter: () => Storage.get(Config.AUTH_TOKEN)
      })
    }),
    AuthService,
    AuthHttp,
    UserModel,
    MemeModel,
    CategoryModel
  ]
})
export class AppComponent {}
