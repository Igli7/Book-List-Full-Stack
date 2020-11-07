import React from 'react';
import '../../App.css';
import Books from '../books/Books';
import BookForm from '../books/BookForm';
import DeleteDialog from '../dialog/DeleteDialog';
import BookContext from '../../context/book/bookContext';
import BookFilter from '../books/BookFilter';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts';

const Home = () => {
  const bookContext = useContext(BookContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { loadUser } = authContext;
  const { setAlert } = alertContext;
  const { showDialog, success, clearErrors, error } = bookContext;

  useEffect(() => {
    if (success !== null) {
      setAlert(success, 'success');
      clearErrors();
    }
    if (error !== null) {
      setAlert(error, 'danger');
      clearErrors();
    }
    loadUser();
    // eslint-disable-next-line
  }, [success, error]);

  return (
    <div className='form' style={{ overflowX: 'hidden' }}>
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
      <Alerts />
    </div>
  );
};

export default Home;
