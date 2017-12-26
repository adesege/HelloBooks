import {
  seedUserTable,
} from '../seeds';
import user from '../seeds/user';

export default {
  before: (browser) => {
    seedUserTable();
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
      .click('.dropdown-menu.show > div > .dropdown-item:nth-child(2)');
  },
  'admin should be able to access categories page': (browser) => {
    browser
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#contentArea', 1000)
      .assert.urlEquals(`${browser.launchUrl}/books/categories`)
      .assert.visible('.toolaction')
      .assert.containsText('h4.title', 'Book categories');
  },
  'admin should be able to add a book category': (browser) => {
    browser
      .click('.toolaction > button')
      .waitForElementVisible('.modal.fade.show', 1000)
      .setValue('#name', 'A book category')
      .click('.modal-footer button.btn-success')
      .pause(1000)
      .waitForElementVisible('.alert-success', 1000)
      .assert.containsText('.alert-success', 'Category added successfully')
      .assert.containsText(
        '#stockTable tbody tr:first-child td:nth-child(2)',
        'A book category'
      );
  },
  'admin should not be able to add a category with same name more than once':
  (browser) => {
    browser
      .click('.toolaction > button')
      .waitForElementVisible('.modal.fade.show', 1000)
      .click('.modal-footer button.btn-success')
      .pause(1000)
      .waitForElementVisible('.alert-danger', 1000)
      .assert.containsText(
        '.alert-danger',
        'A category with this name already exist'
      )
      .end();
  },
};
