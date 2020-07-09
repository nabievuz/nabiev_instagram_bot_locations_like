const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com/';

const LOCATION_URL = (location) => 'https://www.instagram.com/explore/locations/' + location;

const instagram = {

    browser: null,
    page: null,

    initialize: async() => {

        instagram.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--lang=en-US']
        });
        instagram.page = await instagram.browser.newPage();

    },

    login: async(username, password) => {

        await instagram.page.goto(BASE_URL, {
            waitUntil: "networkidle2"
        });

        await instagram.page.waitFor(2000);

        await instagram.page.type('input[name="username"]', username, {
            delay: 50
        });
        await instagram.page.type('input[name="password"]', password, {
            delay: 50
        });

        loginButton = await instagram.page.$x('//div[contains(text(),"Log In")]');
        await loginButton[0].click();

        await instagram.page.waitFor(4000);
        notificationsButton = await instagram.page.$x('//button[contains(text(),"Not Now")]');
        await notificationsButton[0].click();

    },

    likeLocationsProcess: async(locations = []) => {
        for (let location of locations) {

            await instagram.page.goto(LOCATION_URL(location), {
                waitUntil: 'networkidle2'
            });

            await instagram.page.waitFor(1000);

            let posts = await instagram.page.$$('article > div:nth-child(4) img[decoding="auto"]');

            for (let i = 0; i < 6; i++) {
                let post = posts[i];

                await post.click();

                await instagram.page.waitFor('body[style="overflow: hidden;"]');

                let test = await instagram.page.$('body[style="overflow: hidden;"]');
                console.log(test);

                await instagram.page.waitFor(2000);

                let isLikable = await instagram.page.$('svg[aria-label="Like"]');

                console.log('isLikable outside if', isLikable);

                if (isLikable) {

                    console.log('isLikable inside if', isLikable);
                    await instagram.page.click('svg[aria-label="Like"]');

                }

                await instagram.page.waitFor(1000);

                let closeModalButton = await instagram.page.$$('button > svg[aria-label="Close"]');
                await closeModalButton[0].click();

                await instagram.page.waitFor(1000);
            }
            await instagram.page.waitFor(5000);
        }
    }
};

module.exports = instagram;
