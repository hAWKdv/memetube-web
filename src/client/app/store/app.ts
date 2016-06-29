import { User } from './user';
import { Category } from './category';
import { Meme } from './meme';
import * as Immutable from 'immutable';

const app = Immutable.Record({
  user: null,
  categories: Immutable.List([]),
  memes: Immutable.List([])
});

export interface IApp {
  user?: User;
  categories?: Immutable.List<Category>;
  memes?: Immutable.List<Meme>;
}

export class App extends app implements IApp {
  user: User;
  categories: Immutable.List<Category>;
  memes: Immutable.List<Meme>;

  constructor(config: IApp) {
    super(config);
  }
}
