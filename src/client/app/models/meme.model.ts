import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Config } from '../config/config';
import * as Immutable from 'immutable';

import { CategoryModel } from './category.model';
import { Category } from '../store/category';
import { Meme } from '../store/meme';
import { MemeActions } from '../actions/meme.actions';

@Injectable()
export class MemeModel {
  public meme$: any;

  constructor(
    private _store: Store<any>,
    private _categoryModel: CategoryModel,
    private _authHttp: AuthHttp
  ) {
    this.meme$ = _store.select('memes');
  }

  public loadMemes() {
    return new Promise((resolve: any, reject: any) => {
      this._authHttp.get(Config.API)
        .subscribe((data: any) => {
          // map
          console.log(data);

          resolve(data);
        }, (err: any) => reject(err));
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

  public upvoteMeme(meme: Meme) {
    this._authHttp.post(`${Config.API}/${meme.id}/upvote`, null)
      .subscribe(() => {
        MemeActions.upvoteMeme(meme.id);
      });
  }

  public downvoteMeme(meme: Meme) {
    this._authHttp.post(`${Config.API}/${meme.id}/downvote`, null)
      .subscribe(() => {
        MemeActions.downvoteMeme(meme.id);
      });
  }
}
