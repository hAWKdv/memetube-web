import { Action } from '@ngrx/store';
import { initialState } from '../store/index';
import { User } from '../store/user';

import { CHANGE_USER, REMOVE_USER } from '../actions/user.actions';

export const userReducer = (state: User = initialState.get('user'), action: Action) => {
  switch (action.type) {
    case CHANGE_USER:
      state = action.payload;
      break;

    case REMOVE_USER:
      // Not really convinient, but ..
      state = new User({});
      break;
	}

  return state;
};
