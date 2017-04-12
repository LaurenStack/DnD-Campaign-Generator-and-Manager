import { ItemCreatorPipe } from './item-creator.pipe';

describe('ItemCreatorPipe', () => {
  it('create an instance', () => {
    const pipe = new ItemCreatorPipe();
    expect(pipe).toBeTruthy();
  });
});
