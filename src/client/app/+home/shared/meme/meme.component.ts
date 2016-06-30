import { Component, Input } from '@angular/core';
import { Meme } from '../../../store/meme';

import { AuthService } from '../../../auth/auth.service';
import { MemeModel } from '../../../models/meme.model';

@Component({
  selector: 'mt-meme',
  moduleId: module.id,
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css'],
  providers: [MemeModel]
})
export class MemeComponent {
  @Input() meme: Meme;

  constructor(private _auth: AuthService, private _memeModel: MemeModel) {}

  public get isLogged(): boolean {
    return this._auth.isLogged();
  }

  public get didVoted(): boolean {
    return this.meme.voted !== 0;
  }

  public upvote(): void {
    if (this.didVoted) {
      return;
    }

    this._memeModel.upvoteMeme(this.meme)
      .then(null, () => alert('Something went wrong with upvoting ..'));
  }

  public downvote(): void {
    if (this.didVoted) {
      return;
    }

    this._memeModel.downvoteMeme(this.meme)
      .then(null, () => alert('Something went wrong with downvoting ..'));
  }
}
