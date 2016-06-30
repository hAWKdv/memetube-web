import * as Immutable from 'immutable';
import { Category } from './category';
import { Meme } from './meme';
import { User } from './user';
import { App } from './app';

export const initialState = new App({
  user: new User({}),
  categories: Immutable.List<Category>([
    new Category({ id: 1, name: 'Hot' }),
    new Category({ id: 2, name: 'Trending' }),
    new Category({ id: 3, name: 'NSFW' }),
    new Category({ id: 4, name: 'Test' }),
  ]),
  memes: Immutable.List<Meme>([])
});
