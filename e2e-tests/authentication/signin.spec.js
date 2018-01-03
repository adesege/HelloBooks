module.exports = {
  'User should not be able to signin if no email address is provided':
  (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body', 1000)
      .setValue('#email', '')
      .setValue('#password', '')
      .click('#login')
      .pause(1000)
      .assert.containsText('.form-text', 'This field is required')
      .end();
  },
  'User should not be able to signin when the email address does not exist':
  (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body', 1000)
      .setValue('#email', 'helloworld@us.com')
      .setValue('#password', 'hello world')
      .click('#login')
      .pause(1000)
      .assert.containsText('.alert-danger', 'You provided a wrong' +
      ' email address and password')
      .end();
  },
  'User should be able to signin with a valid credentials': (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body', 1000)
      .setValue('#email', 'helloworld@us.com')
      .setValue('#password', 'helloworld@us.com')
      .click('#login')
      .pause(1000)
      .waitForElementPresent('#contentArea', 1000)
      .assert.urlEquals(`${browser.launchUrl}/dashboard`)
      .end();
  },
  'User should be able to logout after successfully sigining in ':
  (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body', 1000)
      .setValue('#email', 'helloworld@us.com')
      .setValue('#password', 'helloworld@us.com')
      .click('#login')
      .pause(1000)
      .waitForElementPresent('#contentArea', 1000)
      .assert.urlEquals(`${browser.launchUrl}/dashboard`)
      .click('a.nav-link.text-danger')
      .end();
  }
};
