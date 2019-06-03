const { browser, by, element } = require('protractor');

class CreatePostPage {
    constructor() {
        this.chooseCommunityField = element(by.css('input[placeholder="Choose a community"]'));
        this.titleField = element(by.css('textarea[placeholder="Title"]'));
        this.textField = element(by.css('div.public-DraftEditor-content[role="textbox"]'));
        this.postButton = element(by.css('button.s1ewxf2z-0.dXKcJM'));
    }

    createNewPost(community, title, text) {
        browser.wait(ExpectedConditions.visibilityOf(this.chooseCommunityField), 5000);
        this.chooseCommunityField.sendKeys(community);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();        
        this.titleField.sendKeys(title);
        this.textField.sendKeys(text);
        this.postButton.click();
    }
}

module.exports = CreatePostPage;