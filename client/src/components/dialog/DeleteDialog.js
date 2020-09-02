import React, { useContext, Fragment, useState } from 'react';
import BookContext from '../../context/book/bookContext';

const DeleteDialog = () => {
  const bookContext = useContext(BookContext);

  const { clearDialog, deleteBook, showDialog } = bookContext;

  const [title, setTitle] = useState({
    titleInput: '',
  });

  const { titleInput } = title;

  const onChange = (e) => {
    setTitle({
      ...title,
      titleInput: e.target.value,
    });
  };

  const onDelete = () => {
    deleteBook(showDialog.id);
    clearDialog();
  };


  const noMatch =
    titleInput !== showDialog.title.split(' ').join('').toLowerCase();

  return (
    <Fragment>
      <div className='dialogBox' onClick={clearDialog}></div>
      <div className='dialog'>
        <h4>Are you sure?</h4>
        <p>
          This action <b style={{ color: 'red' }}>CANNOT</b> be undone!
          <span>
            Type <b>{showDialog.title.split(' ').join('').toLowerCase()} </b>to
            confirm.
          </span>
        </p>

        <div className='titleInput'>
          <input
            type='text'
            name=''
            placeholder='Type here...'
            onChange={onChange}
            value={titleInput}
          />
        </div>
        <div className='buttons'>
          <button onClick={clearDialog} className='cancle'>
            Cancle
          </button>
          <button
            onClick={onDelete}
            disabled={noMatch}
            className={noMatch ? 'deleteNoMatch' : 'deleteMatch'}
          >
            Delete
          </button>
        </div>
      </div>
      
    </Fragment>
  );
};

export default DeleteDialog;
