const { browser, by, element } = require('protractor');

class ProfileOvervieWPage {
    constructor() {
        this.firstPost = element(by.className('Post'));
        this.noPostsText = element(by.xpath('//div[text()="hmm... u/beam_test hasn\'t posted anything"]'));
    }

    openFirstPost() {
        browser.wait(ExpectedConditions.visibilityOf(this.firstPost), 5000);
        this.firstPost.click();
    }

    getNoPostsText() {
        browser.wait(ExpectedConditions.visibilityOf(this.noPostsText), 5000);
        return this.noPostsText.getText();
    }
}

module.exports = ProfileOvervieWPage;