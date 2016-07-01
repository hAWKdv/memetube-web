import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Config } from '../config/config';
import { AuthService } from '../auth/auth.service';
import { getJsonContentTypeHeader } from '../utils/util';
import * as Immutable from 'immutable';

import { CategoryModel } from './category.model';
import { Category } from '../store/category';
import { Meme } from '../store/meme';
import { MemeActions } from '../actions/meme.actions';

const DEFAULT_API: string = Config.API + '/api/memes';

@Injectable()
export class MemeModel {
  public meme$: any;

  constructor(
    private _store: Store<any>,
    private _categoryModel: CategoryModel,
    private _authHttp: AuthHttp,
    private _auth: AuthService
  ) {
    this.meme$ = _store.select('memes');
    //this.loadMemesTmp();
  }

  public loadMemesTmp(page: number = 1, pageSize: number = 10, categoryId?: number) {
    return new Promise((resolve: any, reject: any) => {
      this._authHttp.get('http://localhost:5555/mock-data/memes.json')
        .subscribe((data: any) => {
          const p = page - 1;
          const mocks: Immutable.List<Meme> = Immutable.List<Meme>(
            JSON.parse(data._body).map((m: any) => new Meme({
              title: m.title,
              image: m.image,
              categoryId: m.category,
              ups: m.ups,
              downs: m.downs,
              voted: m.voted ? 0 : m.voted,
            }))
          );

          console.log('request', page, pageSize, categoryId);

          let filtered: any;
          if (categoryId) {
            filtered = mocks.filter((m: Meme) => m.categoryId === categoryId);
          } else {
            filtered = mocks;
          }

          const res = filtered.skip(p * pageSize).take(pageSize);
          this._store.dispatch(MemeActions.addMemes(<any>res));
          resolve(res);
        }, (err: any) => reject(err));
    });
  }

  public loadMemes(page: number = 1, pageSize: number = 10, categoryId?: number) {
    const category: string = categoryId > 0 ? `&category_id=${categoryId}` : '';
    const api: string = this._auth.isLogged() ? DEFAULT_API : Config.API + '/memes';

    return new Promise((resolve: any, reject: any) => {
      this._authHttp.get(`${api}?page=${page}&page_size=${pageSize}${category}`, getJsonContentTypeHeader())
        .subscribe((data: any) => {
          if (!data) { resolve(); }

          const mapped: Immutable.List<Meme> = Immutable.List<Meme>(
            data.map((m: any) => new Meme({
              title: m.title,
              image: m.image,
              categoryId: m.category,
              ups: m.ups,
              downs: m.downs,
              voted: m.voted ? 0 : m.voted,
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

  public getMemesCount(categoryId?: number) {
    return this.meme$.map((memes: Immutable.List<Meme>) => {
      if (categoryId) {
        return memes.filter((m: Meme) => m.categoryId === categoryId).count();
      }
      return memes.count();
    });
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
    const body: string = JSON.stringify({
      title: meme.title,
      image: meme.image,
      categoryId: meme.categoryId
    });

    return new Promise((resolve: any, reject: any) => {
      this._authHttp.post(DEFAULT_API, body, getJsonContentTypeHeader())
        .subscribe((data: any) => {
          const response = JSON.parse(data._body);
          const m = meme.set('id', response.id);
          const action = MemeActions.addMeme(<Meme>m);

          this._store.dispatch(action);
          resolve(m);
        }, (err: any) => reject(err));
    });
  }

  public upvoteMeme(meme: Meme) {
    return new Promise((resolve: any, reject: any) => {
      this._authHttp.post(`${DEFAULT_API}/${meme.id}/upvote`, null, getJsonContentTypeHeader())
        .subscribe(() => {
          this._store.dispatch(MemeActions.upvoteMeme(meme.id));
          resolve(meme.id);
        }, (err: any) => reject(err));
    });
  }

  public downvoteMeme(meme: Meme) {
    return new Promise((resolve: any, reject: any) => {
      this._authHttp.post(`${DEFAULT_API}/${meme.id}/downvote`, null, getJsonContentTypeHeader())
        .subscribe(() => {
          this._store.dispatch(MemeActions.downvoteMeme(meme.id));
          resolve(meme.id);
        }, (err: any) => reject(err));
    });
  }
}
