import chai from 'chai';
import Mailer from '../../utils/Mailer';

const { expect } = chai;

describe('# Mailer', () => {
  it('should return the right mail options', () => {
    const mailer = new Mailer();
    const from = 'testing@test.com';
    const to = 'test@test.com';
    const html = '<h1>Issa html</h1>';
    const subject = '<h1>Issa subject</h1>';
    const expected = {
      from,
      subject,
      html,
      to
    };

    mailer.to = to;
    mailer.from = from;
    mailer.html = html;
    mailer.subject = subject;
    const received = mailer.mailOptions();
    expect(received.to).to.equal(expected.to);
    expect(received.from).to.equal(expected.from);
    expect(received.html).to.equal(expected.html);
    expect(received.subject).to.equal(expected.subject);
  });
});
