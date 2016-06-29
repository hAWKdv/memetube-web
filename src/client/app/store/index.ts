import * as Immutable from 'immutable';
import { Category } from './category';
import { Meme } from './meme';
import { User } from './user';
import { App } from './app';

export const initialState = new App({
  user: new User({}),
  categories: Immutable.List<Category>([]),
  memes: Immutable.List<Meme>([])
});
