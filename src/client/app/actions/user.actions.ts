import { Action } from '@ngrx/store';
import { User } from '../store/user';

export const CHANGE_USER: string = 'user:change_user';

export const UserActions = {
  changeUser(user: User): Action {
    return {
      type: CHANGE_USER,
      payload: user
    };
  }
};
