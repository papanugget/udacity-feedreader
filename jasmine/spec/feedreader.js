/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL is defined for each feed and not empty', () => {
            // allFeeds loop
            allFeeds.forEach((feed) => {
                // console.log(feed.url);
                expect(feed.url).toBeDefined();
                // console.log(feed.id);
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Feed name is defined and not empty', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', () => {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden', () => {
            // select body element
            const body = document.querySelector('body');
            // check for class of menu-hidden on body element
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should change visibility when clicked', () => {
            // select body element
            const body = document.querySelector('body');
            // select menu icon element
            const menuIcon = document.querySelector('.menu-icon-link');
            // simulate icon click
            menuIcon.click();
            // check to see if class menu-hidden is removed from body element
            expect(body.classList.contains('menu-hidden')).toBe(false);
            // simulate menu click again
            menuIcon.click();
            // checks for menu-hidden class to be added to body element
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });       
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // runs async loadFeed() before test
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });
        it('should have at least 1 entry after loadFeed() is called', (done) => {
            // select feed element
            const feed = document.querySelector('.feed');
            // gets number of entries by getting all elements with entry class
            const entries = feed.getElementsByClassName('entry').length;
            // console.log(entries);
            // tests for entries to have at least 1 or greater than 0
            expect(entries).toBeGreaterThan(0);
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // init current feed content
        let oldFeed;
        // async code to run loadFeed() before test
        beforeEach((done) => {
            loadFeed(0, () => {
                // grab current / old feed content before update
                oldFeed = document.querySelector('.feed').innerHTML;
                // console.log(oldFeed);
                // console.log('-----------------------');
                // get new feed content
                loadFeed(1, () => {
                    done();
                });
            });
        });
        it('should change content when the loadFeed() runs', () => {
            // select new feed content
            const newFeed = document.querySelector('.feed').innerHTML;
            // console.log(newFeed);
            // compare newFeed content to oldFeed
            expect(newFeed).not.toBe(oldFeed);
        });
    });
}());
