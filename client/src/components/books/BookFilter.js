import React, { useState, useContext, useRef, useEffect } from 'react';
import BookContext from '../../context/book/bookContext';

const BookFilter = () => {
  const bookContext = useContext(BookContext);

  const { filterBooks, clearFilter, filtered } = bookContext;

  const [state, setState] = useState({
    active: '',
  });

  const onClick = () => {
    setState({
      active: 'active',
    });
  };

  const text = useRef('');

  useEffect(()=> {
    if(filtered === null){
      text.current.value = '';
    }
  })

  const onChange = (e) => {
    setState({
      active: 'active',
    });

    if(text.current.value !== ''){
      filterBooks(e.target.value);
    } else{
      clearFilter();
    }

    
  };

  return (
    <div>
      <div className='searchForm'>
        <form id='search' className={state.active} onClick={onClick}>
          <input
            onChange={onChange}
            type='search'
            ref={text}
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
