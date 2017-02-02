// specs.js
describe('GoMobileCT Homepage', function() {
  it('should have the correc title', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:3000');
    expect(browser.getTitle()).toEqual('GoMobileCT');
  });
});
