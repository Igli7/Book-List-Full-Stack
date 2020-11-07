import React, { useReducer } from 'react';
import BookContext from './bookContext';
import bookReducer from './bookReducer';
import axios from 'axios';

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
  SHOW_NAV,
  BOOK_ERROR,
  GET_BOOKS,
  CLEAR_BOOKS,
  CLEAR_ERRORS,
} from '../types';

const BookState = (props) => {
  const initialState = {
    books: [],
    current: null,
    showDialog: null,
    filtered: null,
    showNav: true,
    error: null,
    success: null,
  };

  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Get books
  const getBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3500/api/books');

      dispatch({
        type: GET_BOOKS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Add book
  const addBook = async (book) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        'http://localhost:3500/api/books',
        book,
        config
      );
      dispatch({
        type: ADD_BOOK,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
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
  const deleteBook = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3500/api/books/${id}`);

      dispatch({
        type: DELETE_BOOK,
        payload: id,
        payload1: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Clear Books
  const clearBooks = () => {
    dispatch({
      type: CLEAR_BOOKS,
    });
  };

  //Update Book,
  const updateBook = async (book) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:3500/api/books/${book._id}`,
        book,
        config
      );

      dispatch({
        type: UPDATE_BOOK,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg,
      });
    }
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
        error: state.error,
        success: state.success,
        addBook,
        deleteBook,
        setDialog,
        clearDialog,
        setCurrent,
        clearCurrent,
        updateBook,
        filterBooks,
        clearFilter,
        navBar,
        getBooks,
        clearBooks,
        clearErrors,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
