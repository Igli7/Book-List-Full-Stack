import {
  ADD_BOOK,
  DELETE_BOOK,
  BOOK_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BOOK,
  FILTER_BOOKS,
  CLEAR_FILTER,
  SET_DIALOG,
  CLEAR_DIALOG,
  SHOW_NAV,
  GET_BOOKS,
  CLEAR_BOOKS,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };

    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload.book],
        success: action.payload.msg,
      };

    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== action.payload),
        success: action.payload1.msg,
      };

    case CLEAR_BOOKS:
      return {
        ...state,
        books: [],
        filtered: null,
        error: null,
        current: null,
        success: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: null,
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
        showDialog: action.payload,
      };

    case CLEAR_DIALOG:
      return {
        ...state,
        showDialog: null,
      };

    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book._id === action.payload.book._id ? action.payload.book : book
        ),
        success: action.payload.msg,
      };

    case FILTER_BOOKS:
      return {
        ...state,
        filtered: state.books.filter((book) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            book.title.match(regex) ||
            book.author.match(regex) ||
            book.isbn.match(regex)
          );
        }),
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case BOOK_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SHOW_NAV:
      return {
        ...state,
        showNav: action.payload,
      };

    default:
      return state;
  }
};
