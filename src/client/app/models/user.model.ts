import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class UserModel {
  user$: any;

  constructor(private _store: Store<any>) {
    this.user$ = _store.select('user');
  }

  public getUser() {
    return this.user$;
  }
}
