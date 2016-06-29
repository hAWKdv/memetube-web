import { Action } from '@ngrx/store';
import { initialState } from '../store/index';
import { Meme } from '../store/meme';
import * as Immutable from 'immutable';

type Memes = Immutable.List<Meme>;

export const memesReducer = (state: Memes = initialState.get('memes'), action: Action) => {
  switch (action.type) {
    default:
	    break;
	}

  return state;
};
