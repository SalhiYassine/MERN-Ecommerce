import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserAdminDetails,
  updateAdminUserDetails,
  updateDetails,
} from '../actions/userAction';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';

const AdminUserEditPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const { loading, success, error, userDetails } = useSelector(
    (state) => state.userAdminGetUser
  );
  const { success: updatedUserSuccess, error: updateError } = useSelector(
    (state) => state.userAdminUpdateUser
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(getUserAdminDetails(match.params.id));
  }, [match, history, updatedUserSuccess]);

  useEffect(() => {
    setName(userDetails.name);
    setEmail(userDetails.email);
    setIsAdmin(userDetails.isAdmin);
  }, [success]);

  useEffect(() => {
    setName(userDetails.name);
    setEmail(userDetails.email);
    setIsAdmin(userDetails.isAdmin);
    if (updateError) {
      setMessage(updateError);
    }
  }, [updatedUserSuccess]);

  const handleSubmit = () => {
    console.log({ name, email, isAdmin });
    dispatch(updateAdminUserDetails(match.params.id, { name, email, isAdmin }));
  };

  return (
    <FormContainer>
      <h1>Edit User</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form>
          <Form.Group controlId='name' className='my-3'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='my-3' controlId='isadmin'>
            <Form.Label>Is an Admin?</Form.Label>
            <Form.Check
              type='checkbox'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>

          <Button onClick={handleSubmit} className='my-3' variant='primary'>
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default AdminUserEditPage;
