import model from '../models';

const Book = model.Book;

export default {
  create(req, res) {
    const title = req.body.title || '';
    const description = req.body.description || '';
    const author = req.body.author || '';
    const publishedDate = req.body.published_date || '';
    const bookURL = req.body.book_url || '';
    const ISSBN = req.body.issbn || '';
    const bookCategoryId = req.body.book_category || '';
    const coverPhotoId = req.body.cover_photo || '';
    const documentPath = req.body.document_path || '';
    const userId = req.decoded.user;

    Book.create(
      {
        title,
        description,
        author,
        publishedDate,
        bookURL,
        ISSBN,
        bookCategoryId,
        coverPhotoId,
        documentPath,
        userId
      },
      {
        fields: ['title', 'description', 'author', 'userId']
      })
      .then(() => res.status(201).send({
        message: 'Book added successfully',
        status: 'Created',
        code: 201
      }))
      .catch(error => res.status(400).send({
        message: error.message,
        status: 'Bad Request',
        code: 400
      }))
      .catch(error => res.status(500).send({
        message: error.message,
        status: 'Internal Server Error',
        code: 500
      }));
  }
};
