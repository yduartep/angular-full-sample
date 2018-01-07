import {DescriptionPipe} from './description.pipe';
import {KeyText} from '../core/models/key-text';

describe('DescriptionPipe', () => {
  let pipe: DescriptionPipe;

  beforeEach(() => {
    pipe = new DescriptionPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('providing value 1 returns "Marvel"', () => {
    expect(pipe.transform(1, [new KeyText(1, 'Marvel'), new KeyText(2, 'DC')])).toBe('Marvel');
  });

  it('providing NO value returns "Unknown"', () => {
    expect(pipe.transform(null, [new KeyText(1, 'Marvel'), new KeyText(2, 'DC')])).toBe('Unknown');
  });

  it('providing invalid value returns "Unknown"', () => {
    expect(pipe.transform(5, [new KeyText(1, 'Marvel'), new KeyText(2, 'DC')])).toBe('Unknown');
  });
});
