import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import { UserModel } from '../models/user.model';
import { CategoryModel } from '../models/category.model';
import { MemeModel } from '../models/meme.model';

import { AuthFormComponent } from './shared/auth-form/index';
import { MemeComponent } from './shared/meme/index';
import { UploaderComponent } from './shared/uploader/index';

@Component({
  selector: 'mt-home',
  moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [AuthService],
  directives: [
    REACTIVE_FORM_DIRECTIVES,
    ROUTER_DIRECTIVES,
    AuthFormComponent,
    MemeComponent,
    UploaderComponent
  ]
})
export class HomeComponent implements OnInit {
  public showAuthForm: boolean;
  public showUploader: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _userModel: UserModel,
    private _categoryModel: CategoryModel,
    private _memeModel: MemeModel
  ) {}

  public get isLogged(): boolean {
    return this._auth.isLogged();
  }

  public get user$() {
    return this._userModel.getUser();
  }

  public get categories$() {
    return this._categoryModel.getCategories();
  }

  public get memes$() {
    return this._route.params
      .flatMap((params: any) => {
        const cat: string = params['category'];

        if (!cat) {
          return this._memeModel.getMemes();
        }
        return this._memeModel.getMemesByCategory(cat);
      });
  }

  public ngOnInit(): void {
    //this._memeModel.loadMemes();
  }

  public toggleAuthForm(): void {
    this.showUploader = false;
    this.showAuthForm = !this.showAuthForm;
  }

  public toggleUploader(): void {
    this.showAuthForm = false;
    this.showUploader = !this.showUploader;
  }

  public logout(): void {
    this._auth.logout();
  }
}
