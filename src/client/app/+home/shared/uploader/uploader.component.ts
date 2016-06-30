import { Component } from '@angular/core';
import { imageToBase64 } from '../../../utils/util';
import { CategoryModel } from '../../../models/category.model';
import { MemeModel } from '../../../models/meme.model';
import { Meme } from '../../../store/meme';

@Component({
  selector: 'mt-uploader',
  moduleId: module.id,
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {
  public title: string;
  public image: string;
  public category: string;

  constructor(
    private _memeModel: MemeModel,
    private _categoryModel: CategoryModel
  ) {}

  public get categories$() {
    return this._categoryModel.getCategories();
  }

  public onImageChange(event: any): void {
    const file: any = event.srcElement.files[0];

    imageToBase64(file, (encoded: string) => {
      this.image = encoded;
    });
  }

  public upload(): void {
    const meme = new Meme({
      title: this.title,
      categoryId: parseInt(this.category),
      image: this.image
    });

    this._memeModel.addMeme(meme)
      .then(
        () => alert(`"${meme.title}" has been uploaded! Great success!`),
        () => alert('Something went wrong ..')
      );
  }
}
