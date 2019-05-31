const FrontPage = require('../page-objects/front.page');

describe('Front page', function () {
    const frontPage = new FrontPage();

    beforeEach(function() {
        frontPage.open();
    })

    afterEach(function() {
        browser.manage().deleteAllCookies();
    })

    it('Should load the correct URL', function() {
        expect(frontPage.getTitle()).toEqual('reddit: the front page of the internet');
    })

    it('Should login with valid credentials', function() {
        frontPage.login("beam_test", "qetwry135");
        expect(frontPage.getSuccessfullyLoggedInPopupMessage()).toEqual('Successfully logged in!');
        expect(frontPage.getUsername()).toEqual('beam_test');
    })

    it('Should give an error when login with invalid credentials', function() {
        frontPage.login("invUser", "invPass");
        expect(frontPage.getUsernameErrorMessage()).toEqual('Incorrect username or password');

    })

    it('Should give an error when login with empty username', function() {
        frontPage.login("", "");
        expect(frontPage.getUsernameErrorMessage()).toEqual('Username must be between 3 and 20 characters');
    })

    it('Should give an error when login with empty password', function() {
        frontPage.login("user", "");
        expect(frontPage.getPasswordErrorMessage()).toEqual('Incorrect password');
    })
})

