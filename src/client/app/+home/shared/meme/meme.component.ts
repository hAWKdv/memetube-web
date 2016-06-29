import { Component, Input } from '@angular/core';
import { Meme } from '../../../store/meme';

@Component({
  selector: 'mt-meme',
  moduleId: module.id,
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent {
  @Input() meme: Meme;

  public upvote(): void {
    console.log('upvote');
  }

  public downvote(): void {
    console.log('downvote');
  }
}
