const { browser, by, element } = require('protractor');

class PostPage {
    constructor() {
        this.threadName = element(by.tagName('h1'));
        this.postTitle = element(by.tagName('h2'));
        this.postText = element(by.css('div[data-click-id="text"] > div > p'));
        this.moreOptionsButton = element(by.xpath('//div[contains(@class, "Post")]/div[@data-test-id="post-content"]//button[@aria-label="more options"]'));
        this.editPostButton = element(by.xpath('//div[@class="SubredditVars-r-beam_test"]/div[@role="menu"]/div/button[3]'));
        this.textField = element(by.xpath('//div[@data-test-id="post-content"]//div[@role="textbox"]'));
        this.saveButton = element(by.xpath('//button[text()="save"]'));
        this.postSuccessfullyEditedPopupMessage = element(by.xpath('//span[text()="Post successfully edited"]'));
        this.deleteButton = element(by.xpath('//div[@class="SubredditVars-r-beam_test"]/div[@role="menu"]/div/button[6]'));
        this.deletePostButton = element(by.xpath('//button[text()="delete post"]'));
        this.postSuccessfullyDeletedPopupMessage = element(by.xpath('//span[text()="Post deleted successfully."]'));

    }

    getThreadName() {
        browser.wait(ExpectedConditions.visibilityOf(this.threadName), 5000);
        return this.threadName.getText();
    }

    getPostTitle() {
        return this.postTitle.getText();
    }

    getPostText() {
        return this.postText.getText();
    }

    editPostDescription(newDescription) {
        browser.wait(ExpectedConditions.visibilityOf(this.moreOptionsButton), 5000);
        this.moreOptionsButton.click();
        browser.wait(ExpectedConditions.visibilityOf(this.editPostButton), 5000);
        this.editPostButton.click();
        this.textField.sendKeys(newDescription);
        this.saveButton.click();
    }

    getSuccessfullyEditedPopupMessage() {
        browser.wait(ExpectedConditions.visibilityOf(this.postSuccessfullyEditedPopupMessage), 5000);
        return this.postSuccessfullyEditedPopupMessage.getText();
    }

    deletePost() {
        this.moreOptionsButton.click();
        this.deleteButton.click();
        this.deletePostButton.click();
    }

    getSuccessfullyDeletedPopupMessage() {
        browser.wait(ExpectedConditions.visibilityOf(this.postSuccessfullyDeletedPopupMessage), 5000);
        return this.postSuccessfullyDeletedPopupMessage.getText();
    }


}

module.exports = PostPage;