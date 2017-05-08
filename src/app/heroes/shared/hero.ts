import { Editorial } from './editorial.enum';

export class Hero {
  id: number;
  name: string;
  editorial: Editorial;
  image: string;

  constructor(id: number, name: string, editorial: Editorial, image: string) {
    this.id = id;
    this.name = name;
    this.editorial = editorial;
    this.image = image;
  }
}
