import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from 'react-bootstrap';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutBreadcrum from '../components/CheckoutBreadcrum';

const PlaceOrderPage = ({ history }) => {
  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state) => state.cart
  );

  if (cartItems.length < 1) {
    history.push('/cart');
  }
  if (!shippingAddress || !shippingAddress.address) {
    history.push('/shipping');
  }
  if (!paymentMethod) {
    history.push('/payment');
  }

  const orderHandler = () => {};

  const itemsPrice = (
    cartItems.reduce((price, item) => price + item.qty * item.price, 0) * 0.8
  ).toFixed(2);

  const itemsShipping = (itemsPrice < 100 ? 10 : 0).toFixed(2);

  const itemsTax = (
    cartItems.reduce((price, item) => price + item.qty * item.price, 0) * 0.2
  ).toFixed(2);

  const totalPrice =
    Number(itemsPrice) + Number(itemsShipping) + Number(itemsTax);

  return (
    <>
      <Row>
        <CheckoutBreadcrum step2 step3 step4 />
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                <br />
                {shippingAddress.address},
                <br />
                {shippingAddress.city},
                <br />
                {shippingAddress.postCode},
                <br />
                {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant='flush'>
                <>
                  {cartItems.map((item) => (
                    <>
                      <ListGroup.Item key={item.product}>
                        <Row>
                          <Col sm={2} md={2} lg={2} xl={2}>
                            <Image
                              fluid
                              rounded
                              src={item.image}
                              alt={item.name}
                            />
                          </Col>
                          <Col>
                            <Link to={`product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x £{item.price} : £
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  ))}
                </>
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3 className='text-center'>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items (Net)</Col>
                  <Col>£{itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>£{itemsShipping}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>£{itemsTax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>£{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  onClick={orderHandler}
                  className='btn-block w-100'>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
