import moment from 'moment';
import model from '../models';
import MailerClass from '../utils/Mailer';

const { EMAIL_FROM } = process.env;

const { borrowedBook } = model;
const Mailer = new MailerClass();

/**
 * Checks the database
 * and sends users a surcharge mail
 *
 * @returns {boolean} true
*/
const sendSurcharge = () =>
  borrowedBook.findAll({
    include: ['User', 'Book'],
    plain: true
  })
    .then((borrowed) => {
      if (borrowed) {
        const expectedReturnDate = moment(borrowed.expectedReturnDate);
        const today = moment();
        const difference = expectedReturnDate.diff(today, 'days');
        if (difference > 0 && borrowed.notificationSent !== true) {
          Mailer.to = borrowed.User.email;
          Mailer.from = EMAIL_FROM;
          Mailer.subject = 'Surcharge notification on your account';
          Mailer.html = `
        <p>Hello <strong>${borrowed.User.name}</strong>,</p>
        <p>This is to notify you that there is a surcharge on your account.</p>
        <p>Please return the book titled <strong>${borrowed.Book.title}</strong> 
        which in your possession within the next 3 days 
        or you will be asked to pay a fine for defaulting.</p>
        <p>Thank you for the understanding</p><br/>
        <p>Best regards</p>
        `;

          Mailer.send();
          borrowedBook.update(
            {
              notificationSent: true,
              id: borrowed.id
            },
            {
              where: { id: borrowed.id }
            }
          );
        }
        return true;
      }
    });


export default sendSurcharge;
