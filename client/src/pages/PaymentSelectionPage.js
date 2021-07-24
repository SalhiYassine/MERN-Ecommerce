import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutBreadcrum from '../components/CheckoutBreadcrum';

const PaymentSelectionPage = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [payment, setPayment] = useState('PayPal');

  if (!shippingAddress || !shippingAddress.address) {
    history.push('/shipping');
  }

  const submitHandler = () => {
    dispatch(savePaymentMethod(payment));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutBreadcrum step2 step3 />
      <h2>Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='payment' className='my-3'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal'
              id='PayPal'
              name='payment'
              value='PayPal'
              onChange={(e) => setPayment(e.target.value)}></Form.Check>
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='payment'
              value='Stripe'
              onChange={(e) => setPayment(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentSelectionPage;
