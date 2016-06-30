import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CategoryModel } from './category.model';
import { Category } from '../store/category';
import { Meme } from '../store/meme';

@Injectable()
export class MemeModel {
  meme$: any;

  constructor(private _store: Store<any>, private _categoryModel: CategoryModel) {
    this.meme$ = _store.select('memes');
  }

  public getMemes() {
    return this.meme$;
  }

  public getMemesByCategory(categoryName: string) {
    return this._categoryModel.getCategoryByName(categoryName)
      .map((category: Category) => {
        return this.getMemes()
          .filter((meme: Meme) => meme.categoryId === category.id);
      });
  }
}
