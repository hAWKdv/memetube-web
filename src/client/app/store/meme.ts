import * as Immutable from 'immutable';

const meme = Immutable.Record({
  id: -1,
  image: null,
  title: null,
  category: null,
  voted: false,
  ups: -1,
  downs: -1
});

export interface IMeme {
  id?: number;
  image?: string;
  title?: string;
  category?: string;
  voted?: boolean;
  ups?: number;
  downs?: number;
}

export class Meme extends meme implements IMeme {
  id: number;
  image: string;
  title: string;
  category: string;
  voted: boolean;
  ups: number;
  downs: number;

  constructor(config: IMeme) {
    super(config);
  }
}
