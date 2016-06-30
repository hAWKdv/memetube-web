import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Http } from '@angular/http';
import { Config } from '../config/config';
import { Storage } from '../utils/storage';

import { User } from '../store/user';
import { UserActions } from '../actions/user.actions';

@Injectable()
export class UserModel {
  public user$: any;

  constructor(private _store: Store<any>, private _http: Http) {
    this.user$ = _store.select('user');
  }

  public login(username: string, password: string) {
    return this._authorization('login', username, password);
  }

  public register(username: string, password: string) {
    return this._authorization('auth', username, password);
  }

  public changeUser(user: User) {
    const action: Action = UserActions.changeUser(user);
    this._store.dispatch(action);
  }

  public removeUser() {
    const action: Action = UserActions.removeUser();
    this._store.dispatch(action);
  }

  public getUser() {
    return this.user$;
  }

  private _authorization(endpoint: string, username: string, password: string) {
    return new Promise((resolve: any, reject: any) => {
      this._http.post(`${Config.API}/${endpoint}`, null)
        .subscribe((data: any) => {
          const user: User = new User({
            username: username
          });

          const action: Action = UserActions.changeUser(user);
          this._store.dispatch(action);

          Storage.set(Config.AUTH_TOKEN, data.jwt);
          Storage.set(Config.AUTH_USERNAME, username);

          resolve(user);
        }, (err: any) => reject(err));
    });
  }
}
