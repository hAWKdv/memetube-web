import { Action } from '@ngrx/store';
import { Meme } from '../store/meme';

export const ADD_MEME: string = 'meme:add_meme';
export const UPVOTE_MEME: string = 'meme:upvote_meme';
export const DOWNVOTE_MEME: string = 'meme:downvote_meme';

export const MemeActions = {
  addMeme(meme: Meme): Action {
    return {
      type: ADD_MEME,
      payload: meme
    };
  },
  upvoteMeme(memeId: number): Action {
    return {
      type: UPVOTE_MEME,
      payload: { memeId }
    };
  },
  downvoteMeme(memeId: number): Action {
    return {
      type: DOWNVOTE_MEME,
      payload: { memeId }
    };
  },
};
