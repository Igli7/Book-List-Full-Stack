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
  SET_DIALOG_TITLE,
  SET_DIALOG_ID,
  SET_UPDATE,
  CLEAR_UPDATE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };

    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case SET_DIALOG:
      return {
        ...state,
        showDialog: true,
      };

    case CLEAR_DIALOG:
      return {
        ...state,
        showDialog: false,
      };

    case SET_UPDATE:
      return {
        ...state,
        showUpdate: true,
      };
    case CLEAR_UPDATE:
      return {
        ...state,
        showUpdate: false,
      };

    default:
      return state;
  }
};
