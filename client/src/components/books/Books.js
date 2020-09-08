import React, { useContext } from 'react';
import BookContext from '../../context/book/bookContext';
import BookItem from './BookItem';

const Books = () => {
  const bookContext = useContext(BookContext);

  const { books, filtered } = bookContext;

  if(books.length === 0){
    return <h4 style={{
      textAlign:'center',
      paddingBottom: '3.5em',
      paddingTop:'2em'
    }}>Please Add a Book</h4>
  }

  return (
    <div className='bookList'>
      {filtered !== null ? filtered.map((book) => (<BookItem book={book} key={book.id} />)) : books.map((book) => (
        <BookItem book={book} key={book.id} />
      ))}

  
    </div>
  );
};

export default Books;
