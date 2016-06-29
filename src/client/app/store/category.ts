import * as Immutable from 'immutable';

const category = Immutable.Record({
  id: -1,
  name: null
});

export interface ICategory {
  id?: number;
  name?: string;
}

export class Category extends category implements ICategory {
  id: number;
  name: string;

  constructor(config: ICategory) {
    super(config);
  }
}
