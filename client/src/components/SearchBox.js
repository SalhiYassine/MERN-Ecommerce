import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    // Stuff
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push(`/`);
    }
  };
  const changeHandler = (newKeyword) => {
    setKeyword(newKeyword);
    // Stuff
    if (newKeyword.trim()) {
      history.push(`/search/${newKeyword}`);
    } else {
      history.push(`/`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex' inline>
      <Form.Control
        type='text'
        value={keyword}
        onChange={(e) => changeHandler(e.target.value)}
        placeholder='Search for a product'
        className='me-sm-2 ms-sm-5'></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
