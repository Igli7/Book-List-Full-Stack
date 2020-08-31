import React, { Fragment } from 'react';
import BookContext from '../../context/book/bookContext';
import { useContext } from 'react';
import BookItem from '../books/BookItem';
const UpdateForm = ({ id }) => {
  const bookContext = useContext(BookContext);

  const { current, books } = bookContext;

  const { title, author, isbn, date, description } = current;

  // filtered books
  const filterd = books.filter((book) => book.id !== id);
  console.log(filterd);

  return (
    <Fragment>
      {current.id === id && (
        <div className='book'>
          <div className='profile-box'>
            <h2>
              <textarea type='text' placeholder={title}></textarea>
            </h2>
            <div className='author'>
              <h3>
                Author: <span className='authorName'>{author}</span>
              </h3>
            </div>
            <div className='isbn'>
              <h3>
                ISBN: <span className='isbnName'>{isbn}</span>
              </h3>
            </div>
            <div className='date'>
              <h3>Date:</h3>
              <p className='addDate'>{date}</p>
            </div>
            <div className='description'>
              <h3>Description:</h3>
              <p className='addDescription'>{description}</p>
            </div>
            <button href='' className='remove'>
              <i className='far fa-trash-alt'></i>
            </button>
            <button href='' className='remove edit'>
              <i className='far fa-edit'></i>
            </button>
          </div>
        </div>
      )}
      {filterd.map((book) => (
        <BookItem book={book} key={book.id} />
      ))}
    </Fragment>
  );
};

export default UpdateForm;
