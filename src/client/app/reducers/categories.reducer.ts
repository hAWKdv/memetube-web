import { ActionReducer, Action } from '@ngrx/store';
import { initialState } from '../store/index';
import { Category } from '../store/category';
import * as Immutable from 'immutable';

type Categories = Immutable.List<Category>;

export const categoriesReducer: ActionReducer<Categories> = (state: Categories = initialState.get('categories'), action: Action) => {
  switch (action.type) {
    default:
	    break;
	}

  return state;
};
