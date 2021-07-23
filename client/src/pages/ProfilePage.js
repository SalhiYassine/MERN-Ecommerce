import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getDetails } from '../actions/userAction';

import { useSelector, useDispatch } from 'react-redux';
import { updateDetails } from '../actions/userAction';

const ProfilePage = ({ history, location }) => {
  const dispatch = useDispatch();

  const { loading, error, userDetails } = useSelector(
    (state) => state.userDetails
  );

  const updateUser = useSelector((state) => state.userUpdateDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != passwordConfirmation) {
      setMessage('Passwords do not match!');
    } else {
      dispatch(updateDetails({ id: userDetails._id, name, email, password }));
      setMessage('');
    }
  };

  useEffect(() => {
    if (!userDetails) {
      dispatch(getDetails('profile'));
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
    }
  }, [dispatch, history, location, userInfo, userDetails]);

  return (
    <Row>
      <Col sm={12} md={5} lg={4} xl={4}>
        <h1>Profile</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {updateUser.success && (
          <Message variant='success'>{'Profile Updated!'}</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
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
          <Form.Group controlId='password' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='my-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </Form.Group>
          <Button type='submit' className='my-3' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col sm={12} md={7} lg={8} xl={8}>
        <h3 className='text-center'>Orders</h3>
      </Col>
    </Row>
  );
};

export default ProfilePage;
