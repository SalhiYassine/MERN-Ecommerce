import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getDetails } from '../actions/userAction';
import { USER_UPDATE_DETAILS_RESET } from '../constants/userConstants';

import { useSelector, useDispatch } from 'react-redux';
import { updateDetails } from '../actions/userAction';
import { getMyOrders } from '../actions/orderAction';

const ProfilePage = ({ history, location }) => {
  const dispatch = useDispatch();

  const { loading, error, userDetails } = useSelector(
    (state) => state.userDetails
  );

  const { success } = useSelector((state) => state.userUpdateDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    orders,
    loading: ordersLoading,
    errors: ordersError,
  } = useSelector((state) => state.orderProfile);
  console.log(ordersLoading);
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
    if (!userDetails || success) {
      dispatch({ type: USER_UPDATE_DETAILS_RESET });
      dispatch(getDetails('profile'));
      dispatch(getMyOrders());
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
    }
  }, [dispatch, history, location, userInfo, userDetails, success]);

  return (
    <Row>
      <Col sm={12} md={5} lg={3} xl={3}>
        <h1>Profile</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>{'Profile Updated!'}</Message>}
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
      <Col sm={12} md={7} lg={9} xl={9}>
        <h3 className='text-center'>Orders</h3>
        {ordersLoading ? (
          <Loader />
        ) : ordersError ? (
          <Message variant='danger'>{ordersError}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='outline-dark' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
