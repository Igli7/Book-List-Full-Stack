import React, { useReducer } from 'react';
import BookContext from './bookContext';
import bookReducer from './bookReducer';
import { v4 as uuidv4 } from 'uuid';

import {
  ADD_BOOK,
  DELETE_BOOK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BOOK,
  FILTER_BOOKS,
  CLEAR_FILTER,
  SET_DIALOG,
  CLEAR_DIALOG,
  SHOW_NAV
  
} from '../types';

const BookState = (props) => {
  const initialState = {
    books: [
      {
        id: '1',
        title: 'Book 1',
        author: 'Author 1',
        isbn: '1234567890123',
        date: '10/12/2018',
        description: 'Best ever',
      },
      {
        id: '2',
        title: 'Book 2',
        author: 'Author 2',
        isbn: '1234567890124',
        date: '12/07/2019',
        description: 'Best ever 2',
      },
      {
        id: '3',
        title: 'Book 3',
        author: 'Author 3',
        isbn: '1234567890125',
        date: '06/07/2020',
        description: 'Best ever 3',
      },
    ],
    current: null,
    showDialog: null,
    filtered: null,
    showNav: true,
  };


  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Add book
  const addBook = (book) => {
    book.id = uuidv4();
    dispatch({
      type: ADD_BOOK,
      payload: book,
    });
  };

  //Set Current Book,
  const setCurrent = (book) => {
    dispatch({
      type: SET_CURRENT,
      payload: book,
    });
  };

  //clear Current Book,
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  // Set Dialog
  const setDialog = (title) => {
    dispatch({
      type: SET_DIALOG,
      payload: title,
    });
  };

  //Clear Dialog
  const clearDialog = () => {
    dispatch({
      type: CLEAR_DIALOG,
    });
  };

  // Delete book
  const deleteBook = (id) => {
    dispatch({
      type: DELETE_BOOK,
      payload: id,
    });
  };

  //Update Book,
  const updateBook = (book) => {
    dispatch({
      type: UPDATE_BOOK,
      payload: book,
    });
  };

  //Filter Books,

  const filterBooks = (text) => {
    dispatch({
      type: FILTER_BOOKS,
      payload: text,
    });
  };

  //Clear Filter

  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  const navBar = (text) => {
    dispatch({
      type: SHOW_NAV,
      payload: text,
    });
  };

  // Show Nav 

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        showDialog: state.showDialog,
        current: state.current,
        filtered: state.filtered,
        showNav: state.showNav,
        addBook,
        deleteBook,
        setDialog,
        clearDialog,
        setCurrent,
        clearCurrent,
        updateBook,
        filterBooks,
        clearFilter,
        navBar
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
