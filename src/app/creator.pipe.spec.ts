import { CreatorPipe } from './creator.pipe';

describe('CreatorPipe', () => {
  it('create an instance', () => {
    const pipe = new CreatorPipe();
    expect(pipe).toBeTruthy();
  });
});
