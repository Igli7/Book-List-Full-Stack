import React from 'react';
import '../../App.css';
import Books from '../books/Books';
import BookForm from '../books/BookForm';
import DeleteDialog from '../dialog/DeleteDialog';
import BookContext from '../../context/book/bookContext';
import BookFilter from '../books/BookFilter';
import { useContext } from 'react';

const Home = () => {
  const bookContext = useContext(BookContext);

  const { showDialog } = bookContext;

  return (
    <div className='form' style={{overflowX: 'hidden'}}>
      {showDialog && <DeleteDialog />}
      <h1>Add a Book</h1>

      <div>
        <BookForm />
      </div>
      <div style={{ display: 'block' }}>
        <BookFilter />
      </div>
      <div>
        <Books />
      </div>
    </div>
  );
};

export default Home;
