import React, { useState, useContext } from 'react';
import BookContext from '../../context/book/bookContext';
import AlertContext from '../../context/alert/alertContext';
const BookForm = () => {
  const bookContext = useContext(BookContext);
  const alertContext = useContext(AlertContext);

  const { addBook } = bookContext;
  const { setAlert } = alertContext;

  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    date: '',
    description: '',
  });

  const { title, author, isbn, date, description } = book;

  const onChange = (e) =>
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (book.isbn.length !== 13) {
      setAlert('ISBN number must be 13 characters!', 'danger');
    } else {
      addBook(book);

      setBook({
        title: '',
        author: '',
        isbn: '',
        date: '',
        description: '',
      });
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
  setInputFilter(document.getElementById('isbn'), function (value) {
    return /^\d*$/.test(value);
  });

  return (
    <form id='book-form' onSubmit={onSubmit}>
      <div className='text'>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={onChange}
          required
        />
        <label htmlFor='title' className='labelName'>
          <span className='contentName'>Title</span>
        </label>
      </div>
      <div className='text'>
        <input
          type='text'
          name='author'
          id='author'
          value={author}
          onChange={onChange}
          required
        />
        <label htmlFor='author' className='labelName'>
          <span className='contentName'>Author</span>
        </label>
      </div>
      <div className='text'>
        <input
          type='tel'
          name='isbn'
          id='isbn'
          value={isbn}
          onChange={onChange}
          required
          maxLength={13}
        />
        <label htmlFor='isbn' className='labelName'>
          <span className='contentName'>
            ISBN <span className='dateSpan'>(13-digit #)</span>
          </span>
        </label>
      </div>
      <div className='text'>
        <input
          type='text'
          name='date'
          id='date'
          value={date}
          onChange={onChange}
          required
        />
        <label htmlFor='date' className='labelName'>
          <span className='contentName'>
            Date <span className='dateSpan'>(MM/DD/YYYY)</span>
          </span>
        </label>
      </div>
      <div className='text message'>
        <textarea
          type='text'
          name='description'
          id='description'
          required
          value={description}
          onChange={onChange}
        ></textarea>

        <label htmlFor='description' className='labelName'>
          <span className='contentName'>Description...</span>
        </label>
      </div>
      <div className='btn'>
        <input type='submit' value='Add Book' className='button' />
      </div>
    </form>
  );
};

export default BookForm;
