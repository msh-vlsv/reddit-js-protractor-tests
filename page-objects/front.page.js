const { browser, by, element } = require('protractor');

class FrontPage {
    constructor() {
        this.loginButton = element(by.css('a._3Wg53T10KuuPmyWOMWsY2F.s7bz5cq-5.jpMCyu'));
        this.loginFrame = element(by.css('iframe.s5zvo2i-2.hfjXmK'));
        this.usernameField = element(by.id('loginUsername'));
        this.passwordField = element(by.id('loginPassword'));
        this.signInButton = element(by.className('AnimatedForm__submitButton'));
        this.usernameErrorMessage = element(by.css('fieldset.AnimatedForm__field.login > div.AnimatedForm__errorMessage'));
        this.passwordErrorMessage = element(by.css('fieldset.AnimatedForm__field.password > div.AnimatedForm__errorMessage'));
        this.successfullyLoggedInPopupMessage = element(by.xpath('//span[text()="Successfully logged in!"]'));
        this.username = element(by.css('button#USER_DROPDOWN_ID > div > div > div > div'));
        this.myProfileButton = element(by.css('a[href = "/user/beam_test"]'));
        this.createPostButton = element(by.css('button[aria-label="Create Post"]'));
    }

    open() {
        return browser.get('/');
    }

    getTitle() {
        return browser.getTitle();
    }

    clickLoginButton(){
        this.loginButton.click();
    }

    login(username, password) {
        this.clickLoginButton();
        browser.switchTo().frame(this.loginFrame.getWebElement());
        this.usernameField.sendKeys(username);
        this.passwordField.sendKeys(password);
        this.signInButton.click();
    }

    getUsername() {
        return this.username.getText();
    }

    getUsernameErrorMessage() {
        browser.wait(ExpectedConditions.visibilityOf(this.usernameErrorMessage), 5000);
        return this.usernameErrorMessage.getText();
    }

    getPasswordErrorMessage() {
        browser.wait(ExpectedConditions.visibilityOf(this.passwordErrorMessage), 5000);
        return this.passwordErrorMessage.getText();
    }

    getSuccessfullyLoggedInPopupMessage() {
        browser.wait(ExpectedConditions.visibilityOf(this.successfullyLoggedInPopupMessage), 5000);
        return this.successfullyLoggedInPopupMessage.getText();
    }

    clickCreatePostButton() {
        this.createPostButton.click();
    }

    openMyProfilePage() {
        this.username.click();
        this.myProfileButton.click();
    }

}

module.exports = FrontPage;
