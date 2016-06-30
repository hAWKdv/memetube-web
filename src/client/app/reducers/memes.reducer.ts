import { Action } from '@ngrx/store';
import { initialState } from '../store/index';
import { Meme } from '../store/meme';

import {
  ADD_MEME, UPVOTE_MEME, DOWNVOTE_MEME
} from '../actions/meme.actions';

export const memesReducer = (state = initialState.get('memes'), action: Action) => {
  switch (action.type) {
    case ADD_MEME:
      state = state.push(action.payload);
      break;

    case UPVOTE_MEME: {
      const idx: number = state.findIndex((m: Meme) => m.id === action.payload.memeId);
      const meme: Meme = state.get(idx);

      state = state.set(idx, meme.set('ups', meme.ups + 1));
    }
    break;

    case DOWNVOTE_MEME: {
      const idx: number = state.findIndex((m: Meme) => m.id === action.payload.memeId);
      const meme: Meme = state.get(idx);

      state = state.set(idx, meme.set('downs', meme.downs + 1));
    }
    break;
	}

  return state;
};
