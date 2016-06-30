import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Config } from '../config/config';
import * as Immutable from 'immutable';

import { Category } from '../store/category';
import { CategoryActions } from '../actions/category.actions';

@Injectable()
export class CategoryModel {
  public category$: any;

  constructor(private _store: Store<any>, private _http: Http) {
    this.category$ = _store.select('categories');
  }

  public loadCategories() {
    return new Promise((resolve: any, reject: any) => {
      this._http.get(Config.API)
        .subscribe((data: any) => {
          const mapped = Immutable.List<Category>(
            data.map((cat: any) => new Category({ id: cat.id, name: cat.name }))
          );

          this._store.dispatch(CategoryActions.addCategories(mapped));
          resolve(mapped);
        }, (err: any) => reject(err));
    });
  }

  public getCategories() {
    return this.category$;
  }

  public getCategoryByName(name: string) {
    return this.category$
      .map((categories: Immutable.List<Category>) => {
        return categories.find((category: Category) => category.name === name);
      });
  }
}
