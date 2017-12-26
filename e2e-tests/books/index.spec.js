import path from 'path';
import {
  seedCategoryTable,
  seedUserTable,
  truncateBookTable
} from '../seeds';
import user from '../seeds/user';

export default {
  before: (browser) => {
    seedUserTable();
    seedCategoryTable();
    truncateBookTable();
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body', 1000)
      .setValue('#email', user.email)
      .setValue('#password', user.password)
      .click('#login')
      .pause(1000)
      .waitForElementPresent('#contentArea', 1000)
      .assert.urlEquals(`${browser.launchUrl}/dashboard`)
      .click('.nav-link.dropdown-toggle')
      .pause(1000)
      .waitForElementVisible('.dropdown-menu.show', 1000)
      .click('.dropdown-menu.show > .dropdown-item');
  },
  'admin should be able to access books page': (browser) => {
    browser
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#contentArea', 1000)
      .assert.urlEquals(`${browser.launchUrl}/books`)
      .assert.visible('.toolaction')
      .assert.visible('.form-inline');
  },
  'admin should be able to add a book': (browser) => {
    browser
      .click('.toolaction > button')
      .waitForElementVisible('.modal.fade.show', 1000)
      .setValue('#title', 'Half of a yellow sun')
      .setValue('#author', 'Chimamanda Adichie')
      .setValue('#stockQuantity', '1')
      .setValue('#ISBN', '1234567890')
      .setValue('#bookURL', 'http://hellobooks.com')
      .setValue('#publishedDate', '2017')
      .setValue(
        'textarea[name="description"]',
        'A wonderful book title by Chimamanda Adichie'
      )
      .click('.modal select[name="bookCategoryId"]')
      .waitForElementVisible(
        '.modal select[name="bookCategoryId"] > option',
        1000
      )
      .click('.modal select[name="bookCategoryId"] > option:nth-child(2)')
      .useXpath()
      .setValue(
        '//input[@type="file"]',
        path.join(__dirname, '../assets/images/cover.jpg')
      )
      .useCss()
      .pause(1000)
      .click('.modal-footer button.btn-success')
      .pause(1000)
      .click('.modal-footer button.btn-success')
      .pause(1000)
      .waitForElementVisible('.alert-success', 10000)
      .assert.containsText('.alert-success', 'Book added successfully');
  },
  'admin should not be able to add the same book more than once':
  (browser) => {
    browser
      .click('.toolaction > button')
      .waitForElementVisible('.modal.fade.show', 1000)
      .setValue('#title', 'Half of a yellow sun')
      .setValue('#author', 'Chimamanda Adichie')
      .setValue('#stockQuantity', '1')
      .setValue('#ISBN', '1234567890')
      .setValue('#bookURL', 'http://hellobooks.com')
      .setValue('#publishedDate', '2017')
      .setValue(
        'textarea[name="description"]',
        'A wonderful book title by Chimamanda Adichie'
      )
      .click('.modal select[name="bookCategoryId"]')
      .waitForElementVisible(
        '.modal select[name="bookCategoryId"] > option',
        1000
      )
      .click('.modal select[name="bookCategoryId"] > option:nth-child(2)')
      .useXpath()
      .setValue(
        '//input[@type="file"]',
        path.join(__dirname, '../assets/images/cover.jpg')
      )
      .useCss()
      .pause(1000)
      .click('.modal-footer button.btn-success')
      .pause(1000)
      .click('.modal-footer button.btn-success')
      .pause(1000)
      .waitForElementVisible('.modal .alert-danger', 10000)
      .assert.containsText(
        '.modal .alert-danger',
        'A book with the same title already exist'
      )
      .click('.modal-footer button.btn-primary')
      .pause(1000)
      .refresh();
  },
  'admin should be able to access book details page':
  (browser) => {
    browser
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#bookList .book:first-child > a', 1000)
      .click('#bookList .book:first-child > a')
      .waitForElementVisible('#borrowBook', 1000)
      .assert.containsText('h4.card-title', 'Half of a yellow sun');
  },
  'admin should be able to borrow a book':
  (browser) => {
    browser
      .click('#borrowBook .dropdown > button.btn-secondary')
      .waitForElementVisible(
        '#borrowBook .dropdown > .dropdown-menu.show',
        1000
      )
      .assert.containsText(
        '#borrowBook .dropdown > .dropdown-menu.show > button',
        'borrow'
      )
      .click('#borrowBook .dropdown > .dropdown-menu.show > button')
      .pause(1000)
      .assert.containsText(
        '.alert-success',
        'You have successfully borrowed this book'
      );
  },
  'admin should be able to return a borrowed a book':
  (browser) => {
    browser
      .click('#borrowBook .dropdown > button.btn-secondary')
      .waitForElementVisible(
        '#borrowBook .dropdown > .dropdown-menu.show',
        1000
      )
      .assert.containsText(
        '#borrowBook .dropdown > .dropdown-menu.show > button',
        'return this book'
      )
      .click('#borrowBook .dropdown > .dropdown-menu.show > button')
      .pause(1000)
      .assert.containsText(
        '.alert-success',
        'You have successfully returned this book'
      )
      .end();
  },
};
