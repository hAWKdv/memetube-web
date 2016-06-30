import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Config } from '../config/config';
import * as Immutable from 'immutable';

import { CategoryModel } from './category.model';
import { Category } from '../store/category';
import { Meme } from '../store/meme';
import { MemeActions } from '../actions/meme.actions';

const DEFAULT_API: string = Config.API + '/memes';

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

  public loadMemes(page: number = 1, pageSize: number = 10, categoryId?: number) {
    const category: string = categoryId > 0 ? `&category_id=${categoryId}` : '';

    return new Promise((resolve: any, reject: any) => {
      this._authHttp.get(`${DEFAULT_API}?page=${page}&page_size=${pageSize}${category}`)
        .subscribe((data: any) => {
          const mapped: Immutable.List<Meme> = Immutable.List<Meme>(
            data.map((m: any) => new Meme({
              title: m.title,
              image: m.image,
              categoryId: m.category,
              ups: m.ups,
              downs: m.downs,
              voted: m.voted,
              userId: m.user
            }))
          );

          const action: Action = MemeActions.addMemes(mapped);
          this._store.dispatch(action);

          resolve(mapped);
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

  public addMeme(meme: Meme) {
    return new Promise((resolve: any, reject: any) => {
      this._authHttp.post(DEFAULT_API, null)
        .subscribe((data: any) => {
          const m = meme.set('id', data.id);
          const action = MemeActions.addMeme(<Meme>m);

          this._store.dispatch(action);
          resolve(m);
        }, (err: any) => reject(err));
    });
  }

  public upvoteMeme(meme: Meme) {
    return new Promise((resolve: any, reject: any) => {
      this._authHttp.post(`${DEFAULT_API}/${meme.id}/upvote`, null)
        .subscribe(() => {
          this._store.dispatch(MemeActions.upvoteMeme(meme.id));
          resolve(meme.id);
        }, (err: any) => reject(err));
    });
  }

  public downvoteMeme(meme: Meme) {
    return new Promise((resolve: any, reject: any) => {
      this._authHttp.post(`${DEFAULT_API}/${meme.id}/downvote`, null)
        .subscribe(() => {
          this._store.dispatch(MemeActions.downvoteMeme(meme.id));
          resolve(meme.id);
        }, (err: any) => reject(err));
    });
  }
}
