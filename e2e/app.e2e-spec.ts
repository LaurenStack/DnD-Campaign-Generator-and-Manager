import { DndCampaignGeneratorAndManagerPage } from './app.po';

describe('dnd-campaign-generator-and-manager App', () => {
  let page: DndCampaignGeneratorAndManagerPage;

  beforeEach(() => {
    page = new DndCampaignGeneratorAndManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
