import nodemailer from 'nodemailer';


/**
 * @class Mailer
 */
export default class Mailer {
  /**
   * Creates an instance of Mailer.
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
   * @param {any} from
   * @memberof Mailer
   * @returns {void}
   */
  from(from) {
    this.from = from;
  }


  /**
   * @param {any} to
   * @memberof Mailer
   * @returns {void}
   */
  to(to) {
    this.to = to;
  }

  /**
   * @param {any} subject
   * @memberof Mailer
   * @returns {void}
   */
  subject(subject) {
    this.subject = subject;
  }


  /**
   * @param {any} text
   * @memberof Mailer
   * @returns {void}
   */
  text(text) {
    this.text = text;
  }

  /**
   * @param {any} html
   * @memberof Mailer
   * @returns {void}
   */
  html(html) {
    this.html = html;
  }

  /**
   * @returns {object} mailOptions
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
   * @memberof Mailer
   * @returns {void}
   */
  send() {
    return this.transporter
      .sendMail(
        this.mailOptions(),
        () => { }
      );
  }
}
