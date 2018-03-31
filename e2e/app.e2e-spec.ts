import { AppPage } from './app.po';

describe('angular-full-sample App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Login page by default', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Login');
  });
});
