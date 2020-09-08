import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { v4 as uuidv4 } from 'uuid';

import {
  REFISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    
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

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        showDialog: state.showDialog,
        current: state.current,
        filtered: state.filtered,
        addBook,
        deleteBook,
        setDialog,
        clearDialog,
        setCurrent,
        clearCurrent,
        updateBook,
        filterBooks,
        clearFilter
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
