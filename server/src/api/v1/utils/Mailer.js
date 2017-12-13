import nodemailer from 'nodemailer';


/**
 * A class wrapper for nodemailer
 *
 * @class Mailer
 */
class Mailer {
  /**
   * Creates an instance of Mailer.
   *
   * @memberof Mailer
   */
  constructor() {
    const { GMAIL_USERNAME, GMAIL_PASSWORD } = process.env;
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: GMAIL_USERNAME,
        pass: GMAIL_PASSWORD
      }
    });
  }

  /**
   * Set where the email is from
   *
   * @param {string} from
   *
   * @memberof Mailer
   *
   * @returns {undefined}
   */
  from(from) {
    this.from = from;
  }


  /**
   * Set the recipient of the mail
   *
   * @param {string} to
   *
   * @memberof Mailer
   *
   * @returns {undefined}
   */
  to(to) {
    this.to = to;
  }

  /**
   * Set the subject of the mail
   *
   * @param {string} subject
   *
   * @memberof Mailer
   *
   * @returns {undefined}
   */
  subject(subject) {
    this.subject = subject;
  }


  /**
   * Set the mail text without HTML syntax
   *
   * @param {string} text
   *
   * @memberof Mailer
   *
   * @returns {undefined}
   */
  text(text) {
    this.text = text;
  }

  /**
   * Set the html format of the mail
   *
   * @param {string} html
   *
   * @memberof Mailer
   *
   * @returns {undefined}
   */
  html(html) {
    this.html = html;
  }

  /**
   * Set the mail option to be sent to Nodemailer
   *
   * @returns {object} mailOptions
   *
   * @memberof Mailer
   */
  mailOptions() {
    return {
      from: this.from,
      subject: this.subject,
      html: this.html,
      to: this.to
    };
  }

  /**
   * Sends the mail using nodemailer
   *
   * @memberof Mailer
   *
   * @returns {undefined}
   */
  send() {
    return this.transporter
      .sendMail(
        this.mailOptions(),
        () => { }
      );
  }
}

export default Mailer;
