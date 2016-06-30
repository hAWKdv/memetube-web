import { Injectable } from '@angular/core';
import { Config } from '../config/config';
import { Storage } from '../utils/storage';
import { UserModel } from '../models/user.model';
import { User } from '../store/user';

@Injectable()
export class AuthService {
  constructor(private _userModel: UserModel) {}

  // Very primitive check
  isLogged(): boolean {
    const username: string = Storage.get(Config.AUTH_USERNAME);
    const isLogged: boolean = !!(Storage.get(Config.AUTH_TOKEN) && username);

    if (isLogged) {
      this._userModel.changeUser(new User({ username }));
    }

    return isLogged;
  }

  logout(): void {
    this._userModel.removeUser();
    Storage.remove(Config.AUTH_USERNAME);
    Storage.remove(Config.AUTH_TOKEN);
  }
}
