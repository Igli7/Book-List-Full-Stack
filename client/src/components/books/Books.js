import React, { useContext } from 'react';
import BookContext from '../../context/book/bookContext';
import BookItem from './BookItem';

const Books = () => {
  const bookContext = useContext(BookContext);

  const { books } = bookContext;

  return (
    <div className='bookList'>
      {books.map((book) => (
        <BookItem book={book} key={book.id} />
      ))}
    </div>
  );
};

export default Books;
