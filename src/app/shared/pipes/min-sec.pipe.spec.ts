import { MinSecPipe } from './min-sec.pipe';
import 'jasmine';

describe('MinSecPipe', () => {
  it('create an instance', () => {
    const pipe = new MinSecPipe();
    expect(pipe).toBeTruthy();
  });
});
