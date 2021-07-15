import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NotFound = () => {
  return (
    <Container fluid className='d-flex flex-column'>
      <h1 className='text-center my-5'>Page Not Found</h1>
      <LinkContainer fluid to='/'>
        <Button className='mx-auto'>RETURN HOME</Button>
      </LinkContainer>
    </Container>
  );
};

export default NotFound;
