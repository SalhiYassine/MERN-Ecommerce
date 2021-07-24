import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutBreadcrum from '../components/CheckoutBreadcrum';

const ShippingPage = ({ history }) => {
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : ''
  );
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : '');

  const [postCode, setPostCode] = useState(
    shippingAddress ? shippingAddress.postCode : ''
  );
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.country : ''
  );

  const submitHandler = () => {
    dispatch(saveShippingAddress({ address, city, postCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutBreadcrum step2 />
      <h2>Shipping</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='postCode' className='my-3'>
          <Form.Label>Post Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Post Code'
            value={postCode}
            required
            onChange={(e) => setPostCode(e.target.value)}
          />
          <Form.Group controlId='city' className='my-3'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter City'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
        </Form.Group>
        <Form.Group controlId='country' className='my-3'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
