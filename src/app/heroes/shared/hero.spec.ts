import { Hero } from './hero';
import {KeyText} from '../../core/models/key-text';

describe('Hero', () => {
  it('should create an instance with id', () => {
    expect(new Hero(1, null, -1, null)).toBeTruthy();
  });

  it('should create an instance with all values', () => {
    expect(new Hero(1, 'Hero 1', 1, 'image1.png')).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const id = 1, name = 'Hero 1', image = 'image1.png', editorial = 1;
    const hero = new Hero(id, name, editorial, image);
    expect(hero.id).toBe(id);
    expect(hero.name).toBe(name);
    expect(hero.editorial).toBe(editorial);
    expect(hero.image).toBe(image);
  });
});
