import * as Immutable from 'immutable';

const user = Immutable.Record({
  id: -1,
  username: null
});

export interface IUser {
  id?: number;
  username?: string;
}

export class User extends user implements IUser {
  id: number;
  username: string;

  constructor(config: IUser) {
    super(config);
  }
}
