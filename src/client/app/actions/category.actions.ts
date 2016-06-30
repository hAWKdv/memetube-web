import { Action } from '@ngrx/store';
import { Category } from '../store/category';
import * as Immutable from 'immutable';

export const ADD_CATEGORIES: string = 'category:add_categories';

export const CategoryActions = {
  addCategories(categories: Immutable.List<Category>): Action {
    return {
      type: ADD_CATEGORIES,
      payload: categories
    };
  }
};
