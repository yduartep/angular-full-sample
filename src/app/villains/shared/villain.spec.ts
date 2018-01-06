import {Villain} from './villain';

describe('Villain', () => {
  it('should create an instance with id', () => {
    expect(new Villain(1, null, -1, null)).toBeTruthy();
  });

  it('should create an instance with all values', () => {
    expect(new Villain(1, 'Villain 1', 1, 'image1.png')).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const id = 1, name = 'Villain 1', image = 'image1.png', editorial = 1;
    const villain = new Villain(id, name, editorial, image);
    expect(villain.id).toBe(id);
    expect(villain.name).toBe(name);
    expect(villain.editorial).toBe(editorial);
    expect(villain.image).toBe(image);
  });
});
