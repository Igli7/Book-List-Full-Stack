import React, { useState, useContext } from 'react';
import BookContext from '../../context/book/bookContext';
const BookForm = () => {
  const bookContext = useContext(BookContext);

  const { addBook } = bookContext;

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

    addBook(book);

    setBook({
      title: '',
      author: '',
      isbn: '',
      date: '',
      description: '',
    });
  };

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
