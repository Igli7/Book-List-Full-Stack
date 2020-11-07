import React, { Fragment, useState, useEffect } from 'react';
import BookContext from '../../context/book/bookContext';
import { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import TextareaAutosize from 'react-textarea-autosize';

const BookItem = ({ book }) => {
  const { _id, title, author, isbn, date, description } = book;

  const bookContext = useContext(BookContext);
  const alertContext = useContext(AlertContext);

  const { setDialog, setCurrent, current, clearCurrent } = bookContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (current !== null) {
      setBook(current);
    }
  }, [bookContext, current]);

  const onDelete = () => {
    setDialog({
      title,
      _id,
    });
    clearCurrent();
  };

  const onEdit = () => {
    setCurrent(book);
  };

  const [updateBook, setBook] = useState({
    _id: _id,
    title: title,
    author: author,
    isbn: isbn,
    date: date,
    description: description,
  });

  const onChange = (e) => {
    setBook({
      ...updateBook,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (updateBook.isbn.length !== 13) {
      setAlert('ISBN number must be 13 characters!', 'danger');
    } else {
      bookContext.updateBook(updateBook);
      clearCurrent();
    }
  };

  // Input Restriction

  // ISBN
  function setInputFilter(textbox, inputFilter) {
    [
      'input',
      'keydown',
      'keyup',
      'mousedown',
      'mouseup',
      'select',
      'contextmenu',
      'drop',
    ].forEach(function (event) {
      if (textbox) {
        textbox.addEventListener(event, function () {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty('oldValue')) {
            this.value = this.oldValue;
            this.setSelectionRange(
              this.oldSelectionStart,
              this.oldSelectionEnd
            );
          } else {
            this.value = '';
          }
        });
      }
    });
  }

  //Install input filter
  //ISBN
  setInputFilter(document.getElementById('isbn1'), function (value) {
    return /^\d*$/.test(value);
  });

  return (
    <Fragment>
      {current && current._id === _id ? (
        <div className='book'>
          <div className='bookList'></div>
          <form
            className='profile-box'
            onSubmit={onSubmit}
            style={{ boxShadow: '5px 10px 20px black' }}
          >
            <h2>
              <TextareaAutosize
                autoFocus
                placeholder={title}
                value={updateBook.title}
                name='title'
                onChange={onChange}
              />
            </h2>
            <div className='author' style={{ marginTop: '-3em' }}>
              <h3>
                Author:{' '}
                <span className='authorName'>
                  <TextareaAutosize
                    placeholder={author}
                    value={updateBook.author}
                    name='author'
                    onChange={onChange}
                  />
                </span>
              </h3>
            </div>
            <div className='isbn'>
              <h3>
                ISBN:{' '}
                <span className='isbnName'>
                  <TextareaAutosize
                    placeholder={isbn}
                    value={updateBook.isbn}
                    name='isbn'
                    id='isbn1'
                    onChange={onChange}
                  />
                </span>
              </h3>
            </div>
            <div className='date'>
              <h3>Date:</h3>
              <p className='addDate'>
                <TextareaAutosize
                  placeholder={date}
                  value={updateBook.date}
                  name='date'
                  id='date1'
                  onChange={onChange}
                  style={{ height: '48px !important', overflowY: 'hidden' }}
                />
              </p>
            </div>
            <div className='description' style={{ paddingBottom: '4em' }}>
              <h3>Description:</h3>
              <p className='addDescription'>
                <TextareaAutosize
                  placeholder={description}
                  value={updateBook.description}
                  name='description'
                  onChange={onChange}
                />
              </p>
            </div>
            <button className='remove' onClick={clearCurrent}>
              <i className='fa fa-times' aria-hidden='true'></i>
            </button>
            <button type='submit' className='remove edit editTwo'>
              <i className='fas fa-check'></i>
            </button>
            <button className='remove cancle' onClick={clearCurrent}>
              Cancle
            </button>
            <button type='submit' className='remove edit confirm'>
              Confirm
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
            <button className='remove' onClick={onDelete}>
              <i className='far fa-trash-alt'></i>
            </button>
            <button className='remove edit' onClick={onEdit}>
              <i className='far fa-edit'></i>
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BookItem;
