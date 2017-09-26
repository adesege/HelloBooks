import moment from 'moment';
import model from '../models';
import MailerClass from '../utils/mailer';

const EMAIL_FROM = '"Hello-Books" <hello@hellobooks.herokuapp.com>';

const borrowedBook = model.borrowedBook;
const Mailer = new MailerClass();
const sendSurcharge = () =>
  borrowedBook.findAll({
    include: ['User', 'Book'],
    plain: true
  })
    .then((borrowed) => {
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
        borrowedBook.update({
          notificationSent: true,
          id: borrowed.id
        },
        {
          where: { id: borrowed.id }
        });
      }
      return true;
    });


export default sendSurcharge;
