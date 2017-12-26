module.exports = {
  'User should not be able to signup if no name is provided': (browser) => {
    browser
      .url(`${browser.launchUrl}/signup`)
      .waitForElementVisible('body', 1000)
      .setValue('#name', '')
      .click('#signup')
      .pause(1000)
      .assert.containsText('.form-text', 'This field is required')
      .end();
  },
  'User should be able to signup when the email address does not exist':
  (browser) => {
    browser
      .url(`${browser.launchUrl}/signup`)
      .waitForElementVisible('body', 1000)
      .setValue('#name', 'Hello world')
      .setValue('#email', 'helloworld@us.com')
      .setValue('#password', 'helloworld@us.com')
      .setValue('#confirmPassword', 'helloworld@us.com')
      .click('#signup')
      .pause(1000)
      .assert.urlEquals(`${browser.launchUrl}/dashboard`)
      .waitForElementPresent('#contentArea', 1000)
      .end();
  },
  'User should not be able to signup with an already existing email address':
  (browser) => {
    browser
      .url(`${browser.launchUrl}/signup`)
      .waitForElementVisible('body', 1000)
      .setValue('#name', 'Hello world')
      .setValue('#email', 'helloworld@us.com')
      .setValue('#password', 'helloworld@us.com')
      .setValue('#confirmPassword', 'helloworld@us.com')
      .click('#signup')
      .pause(1000)
      .assert
      .containsText('.alert-danger', 'This email address ' +
      'already belongs to a user')
      .end();
  },
};
