import { Component, Input } from '@angular/core';
import { Meme } from '../../../store/meme';

import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'mt-meme',
  moduleId: module.id,
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent {
  @Input() meme: Meme;

  constructor(private _auth: AuthService) {}

  public get isLogged(): boolean {
    return this._auth.isLogged();
  }

  public upvote(): void {
    console.log('upvote');
  }

  public downvote(): void {
    console.log('downvote');
  }
}
