import {
  Component, ViewChild, Renderer, ElementRef, OnInit, AfterViewInit
} from '@angular/core';


import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Config } from '../config/config';
import * as Immutable from 'immutable';

import { UserModel } from '../models/user.model';
import { CategoryModel } from '../models/category.model';
import { MemeModel } from '../models/meme.model';

import { Category } from '../store/category';

import { AuthFormComponent } from './shared/auth-form/index';
import { MemeComponent } from './shared/meme/index';
import { UploaderComponent } from './shared/uploader/index';

@Component({
  selector: 'mt-home',
  moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [
    REACTIVE_FORM_DIRECTIVES,
    ROUTER_DIRECTIVES,
    AuthFormComponent,
    MemeComponent,
    UploaderComponent
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('memeContainer') memeContainer: ElementRef;

  public showAuthForm: boolean;
  public showUploader: boolean;
  private _categoryId: number;
  private _page: number;
  private _allowRequest: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _userModel: UserModel,
    private _categoryModel: CategoryModel,
    private _memeModel: MemeModel,
    private _renderer: Renderer
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
    // this._categoryModel.loadCategories()
    //   .then((categories: Immutable.List<Category>) => {
    //     this._route.params
    //       .subscribe((params: any) => {
    //         const cat: string = params['category'];
    //         const catId: number = categories.find((c: Category) => c.name === cat).id;
    //         this._category = catId;

    //         this._memeModel.getMemesCount(catId)
    //           .subscribe((count: number) => {
    //             const calcCount: number = count === 1 ? 0 : count;
    //             const pageCache: number = this._page;

    //             this._page = Math.ceil(calcCount / Config.MEME_FETCH_PORTION) + 1;
    //             this._allowRequest = pageCache === this._page ? false : true;

    //             if (count < Config.MEME_FETCH_PORTION) {
    //               this._loadMemes(catId);
    //             }
    //           });
    //       });
    //   });
  }

  public ngAfterViewInit(): void {
    const cont = this.memeContainer.nativeElement;

    this._renderer.listen(cont, 'scroll', (event: any) => {
      if (cont.offsetHeight + cont.scrollTop >= cont.scrollHeight) {
        this._loadMemes(this._categoryId);
      }
    });
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
    alert('You logged out.');
  }

  private _loadMemes(category?: number): void {
    if (this._allowRequest) {
      this._memeModel.loadMemes(this._page, Config.MEME_FETCH_PORTION, category);
      this._allowRequest = false;
    }
  }
}
