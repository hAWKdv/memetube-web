import { Action } from '@ngrx/store';
import { User } from '../store/user';

export const CHANGE_USER: string = 'user:change_user';
export const REMOVE_USER: string = 'user:remove_user';

export const UserActions = {
  changeUser(user: User): Action {
    return {
      type: CHANGE_USER,
      payload: user
    };
  },

  removeUser(): Action {
    return {
      type: REMOVE_USER,
      payload: null
    };
  }
};
