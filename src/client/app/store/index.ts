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
  memes: Immutable.List<Meme>([
    new Meme({
      image: 'http://img-9gag-fun.9cache.com/photo/amz86z9_700b_v2.jpg',
      title: 'Hot 1',
      categoryId: 1,
      voted: 0,
      ups: 20,
      downs: 10
    }),
    new Meme({
      image: 'http://img-9gag-fun.9cache.com/photo/amz86z9_700b_v2.jpg',
      title: 'Hot 2',
      categoryId: 1,
      voted: 1,
      ups: 21,
      downs: 11
    }),
    new Meme({
      image: 'http://img-9gag-fun.9cache.com/photo/amz86z9_700b_v2.jpg',
      title: 'Trending 1',
      categoryId: 2,
      voted: -1,
      ups: 25,
      downs: 15
    }),
    new Meme({
      image: 'http://img-9gag-fun.9cache.com/photo/amz86z9_700b_v2.jpg',
      title: 'Trending 2',
      categoryId: 2,
      voted: 0,
      ups: 20,
      downs: 10
    }),
    new Meme({
      image: 'http://img-9gag-fun.9cache.com/photo/amz86z9_700b_v2.jpg',
      title: 'NSFW 1',
      categoryId: 3,
      voted: 1,
      ups: 30,
      downs: 0
    }),
    new Meme({
      image: 'http://img-9gag-fun.9cache.com/photo/amz86z9_700b_v2.jpg',
      title: 'NSFW 2',
      categoryId: 3,
      voted: 0,
      ups: 10,
      downs: 0
    })
  ])
});
