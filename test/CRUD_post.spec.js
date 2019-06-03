const FrontPage = require('../page-objects/front.page');
const CreatePostPage = require('../page-objects/create_post.page');
const PostPage = require('../page-objects/post.page');
const ProfileOverviewPage = require('../page-objects/profile_overview.page');

describe('Create Post Page', function() {
    const frontPage = new FrontPage();
    const createPostPage = new CreatePostPage();
    const postPage = new PostPage();
    const profileOverviewPage = new ProfileOverviewPage();

    beforeEach(function() {
        frontPage.open();
        frontPage.login('beam_test', 'qetwry135');
        frontPage.getSuccessfullyLoggedInPopupMessage();
    });

    afterEach(function() {
        browser.manage().deleteAllCookies();
    });

    it('Should create a new post', function() {
        frontPage.clickCreatePostButton();
        createPostPage.createNewPost('u/beam_test', 'My first post', 'Hello World! This is my first post on reddit!');
        expect(postPage.getThreadName()).toEqual('beam_test');
        expect(postPage.getPostTitle()).toEqual('My first post');
        expect(postPage.getPostText()).toEqual('Hello World! This is my first post on reddit!');
    });

    it('Should open existing post', function() {
        frontPage.openMyProfilePage();
        profileOverviewPage.openFirstPost();
        expect(postPage.getPostTitle()).toEqual('My first post');
        expect(postPage.getPostText()).toEqual('Hello World! This is my first post on reddit!');
    });

    it('Should update existing post', function() {
        frontPage.openMyProfilePage();
        profileOverviewPage.openFirstPost();
        postPage.editPostDescription('This post was edited! ');
        expect(postPage.getSuccessfullyEditedPopupMessage()).toEqual('Post successfully edited');
        expect(postPage.getPostText()).toEqual('This post was edited! Hello World! This is my first post on reddit!');
    });

    it('Should delete existing post', function() {
        frontPage.openMyProfilePage();
        profileOverviewPage.openFirstPost();
        postPage.deletePost();
        expect(postPage.getSuccessfullyDeletedPopupMessage()).toEqual('Post deleted successfully.');
        browser.refresh();
        expect(profileOverviewPage.getNoPostsText()).toEqual('hmm... u/beam_test hasn\'t posted anything');
    });





});