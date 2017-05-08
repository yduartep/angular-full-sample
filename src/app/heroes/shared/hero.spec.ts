import { Hero } from './hero';

describe('Hero', () => {
  it('should create an instance with id', () => {
    expect(new Hero(1, null, null)).toBeTruthy();
  });

  it('should create an instance with all values', () => {
    expect(new Hero(1, 'Hero 1', 'image1.png')).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const id = 1, name = 'Hero 1', image = 'image1.png';
    const hero = new Hero(id, name, image);
    expect(hero.id).toBe(id);
    expect(hero.name).toBe(name);
    expect(hero.image).toBe(image);
  });
});
