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
          book.id === action.payload.id ? action.payload : book
        ),
      };

      case FILTER_BOOKS:
        return{
          ...state,
          filtered: state.books.filter(book => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return book.title.match(regex) || book.author.match(regex) || book.isbn.match(regex)
          })
        }

        case CLEAR_FILTER:
          return{
            ...state,
            filtered: null
          }

          case SHOW_NAV:
      return {
        ...state,
        showNav: action.payload,
      };



    

    default:
      return state;
  }
};
