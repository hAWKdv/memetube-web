import { ActionReducer, Action } from '@ngrx/store';
import { initialState } from '../store/index';
import { User } from '../store/user';

import { CHANGE_USER } from '../actions/user.actions';

export const userReducer: ActionReducer<User> = (state: User = initialState.get('user'), action: Action) => {
  switch (action.type) {
    case CHANGE_USER:
      state = action.payload;
      break;

    default:
	    break;
	}

  return state;
};
