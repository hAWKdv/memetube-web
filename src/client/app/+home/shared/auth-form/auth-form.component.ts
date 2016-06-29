import { Component } from '@angular/core';

@Component({
  selector: 'mt-auth-form',
  moduleId: module.id,
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {
  public isLogin: boolean = true;

  public switchForms(): void {
    this.isLogin = !this.isLogin;
  }
}