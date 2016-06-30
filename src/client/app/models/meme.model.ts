import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Config } from '../config/config';
import * as Immutable from 'immutable';

import { CategoryModel } from './category.model';
import { Category } from '../store/category';
import { Meme } from '../store/meme';

@Injectable()
export class MemeModel {
  meme$: any;

  constructor(
    private _store: Store<any>,
    private _categoryModel: CategoryModel,
    private _authHttp: AuthHttp
  ) {
    this.meme$ = _store.select('memes');
  }

  public loadMemes() {
    this._authHttp.get('http://localhost:3000/test')
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  public getMemes() {
    return this.meme$;
  }

  public getMemesByCategory(categoryName: string) {
    return this._categoryModel.getCategoryByName(categoryName)
      .flatMap((category: Category) => {
        return this.getMemes()
          .map((memes: Immutable.List<Meme>) => {
            return memes.filter((meme: Meme) => meme.categoryId === category.id);
          });
      });
  }
}
