import {Villain} from './villain';
import {Editorial} from '../../core/models/editorial';

describe('Villain', () => {
  it('should create an instance with id', () => {
    expect(new Villain(1, null, new Editorial(-1, 'Unknown'), null)).toBeTruthy();
  });

  it('should create an instance with all values', () => {
    expect(new Villain(1, 'Villain 1', new Editorial(1, 'Marvel'), 'image1.png')).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const id = 1, name = 'Villain 1', image = 'image1.png', editorial = new Editorial(1, 'Marvel');
    const villain = new Villain(id, name, editorial, image);
    expect(villain.id).toBe(id);
    expect(villain.name).toBe(name);
    expect(villain.editorial).toBe(editorial);
    expect(villain.image).toBe(image);
  });
});
