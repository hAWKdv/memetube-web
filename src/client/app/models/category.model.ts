import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Immutable from 'immutable';

import { Category } from '../store/category';

@Injectable()
export class CategoryModel {
  category$: any;

  constructor(private _store: Store<any>) {
    this.category$ = _store.select('categories');
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
