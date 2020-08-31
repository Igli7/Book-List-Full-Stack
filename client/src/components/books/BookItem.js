import React, { Fragment, useState } from 'react';
import BookContext from '../../context/book/bookContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import autosize from 'autosize';
import TextareaAutosize from 'react-textarea-autosize';

const BookItem = ({ book }) => {
  const { id, title, author, isbn, date, description } = book;

  const bookContext = useContext(BookContext);

  const { setDialog, setCurrent, setUpdate, showUpdate, current } = bookContext;

  const onDelete = () => {
    setDialog();
    setCurrent(book);
  };

  const onEdit = () => {
    setUpdate();
    setCurrent(book);
  };


  const [updateBook, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    date: '',
    description: '',
  });

  return (
    <Fragment>
      {current && current.id === id ? (
        <div className='book'>
          <form className='profile-box'>
            <h2>
              <TextareaAutosize autoFocus placeholder={title}/>
            </h2>
            <div className='author'>
              <h3>
                Author: <span className='authorName'><TextareaAutosize autoFocus placeholder={author}/></span>
              </h3>
            </div>
            <div className='isbn'>
              <h3>
                ISBN: <span className='isbnName'><TextareaAutosize autoFocus placeholder={isbn}/></span>
              </h3>
            </div>
            <div className='date'>
              <h3>Date:</h3>
              <p className='addDate'><TextareaAutosize autoFocus placeholder={date}/></p>
            </div>
            <div className='description'>
              <h3>Description:</h3>
              <p className='addDescription'><TextareaAutosize autoFocus placeholder={description}/></p>
            </div>
            <button href='' className='remove' onClick={onDelete}>
              <i className='far fa-trash-alt'></i>
            </button>
            <button href='' className='remove edit' onClick={onEdit}>
              <i className='far fa-edit'></i>
            </button>
          </form>
        </div>
      ) : (
        <div className='book'>
          <div className='profile-box'>
            <h2>{title}</h2>
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
            <button href='' className='remove' onClick={onDelete}>
              <i className='far fa-trash-alt'></i>
            </button>
            <button href='' className='remove edit' onClick={onEdit}>
              <i className='far fa-edit'></i>
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BookItem;
