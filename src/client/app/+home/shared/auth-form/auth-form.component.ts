import { Component } from '@angular/core';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'mt-auth-form',
  moduleId: module.id,
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {
  public isLogin: boolean = true;
  public username: string;
  public password: string;
  public confPassword: string;

  constructor(private _userModel: UserModel) {}

  public switchForms(): void {
    this.isLogin = !this.isLogin;
  }

  login(): void {
    this._userModel.login(this.username, this.password)
      .then(null, () => alert('Something went wrong ..'));
  }

  register(): void {
    if (this.username !== this.password) {
      alert('The passwords are not the same!');
    }

    this._userModel.register(this.username, this.password)
      .then(null, () => alert('Something went wrong with registration ..'));
  }
}
