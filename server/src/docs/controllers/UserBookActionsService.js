'use strict';

exports.borrowBook = function(args, res, next) {
  /**
   * parameters expected in the args:
  * authenticateToken (String)
  * book_id (Integer)
  * userId (Integer)
  * requestBody (BorrowBook)
  **/
  // no response value expected for this operation
  res.end();
}

exports.getBorrowedBook = function(args, res, next) {
  /**
   * parameters expected in the args:
  * authenticateToken (String)
  * returned (Boolean)
  * userId (Integer)
  **/
  // no response value expected for this operation
  res.end();
}

exports.returnBorrowedBook = function(args, res, next) {
  /**
   * parameters expected in the args:
  * authenticateToken (String)
  * id (Integer)
  * userId (Integer)
  * borrowedBookId (Integer)
  **/
  // no response value expected for this operation
  res.end();
}

