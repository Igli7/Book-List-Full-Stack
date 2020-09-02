import React, { useState, useContext } from 'react';
import BookContext from '../../context/book/bookContext';

const BookFilter = () => {
  const bookContext = useContext(BookContext);

  const { filterBooks } = bookContext;

  const [state, setState] = useState({
    active: '',
    text: '',
  });

  const onClick = () => {
    setState({
      active: 'active',
    });
  };

  const onChange = (e) => {
    setState({
      text: e.target.value,
      active: 'active',
    });

    filterBooks(state.text);
  };

  console.log(state.text);
  return (
    <div>
      <div className='searchForm'>
        <form id='search' className={state.active} onClick={onClick}>
          <input
            onChange={onChange}
            type='search'
            className={'searchInput ' + state.active}
            placeholder='Search Title'
          />
          <i className={'fa fa-search ' + state.active}></i>
        </form>
      </div>
    </div>
  );
};

export default BookFilter;
