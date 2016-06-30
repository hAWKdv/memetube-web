import * as Immutable from 'immutable';

const meme = Immutable.Record({
  id: -1,
  image: null,
  title: null,
  categoryId: -1,
  voted: 0,
  ups: 0,
  downs: 0
});

export interface IMeme {
  id?: number;
  image?: string;
  title?: string;
  categoryId?: number;
  voted?: number;
  ups?: number;
  downs?: number;
}

export class Meme extends meme implements IMeme {
  id: number;
  image: string;
  title: string;
  categoryId: number;
  voted: number;
  ups: number;
  downs: number;

  constructor(config: IMeme) {
    super(config);
  }
}
