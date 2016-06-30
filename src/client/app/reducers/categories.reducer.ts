import { Action } from '@ngrx/store';
import { initialState } from '../store/index';

import { ADD_CATEGORIES } from '../actions/category.actions';

export const categoriesReducer = (state = initialState.get('categories'), action: Action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      state = state.concat(action.payload);
	    break;
	}

  return state;
};
