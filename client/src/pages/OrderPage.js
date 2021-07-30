import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
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
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails } from '../actions/orderAction';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderPage = ({ match, history }) => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const { order, loading, error } = orderDetails;
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
  };

  const getPayPalScript = async () => {
    const { data: clientId } = await axios.get('/api/config/paypal');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    const orderID = match.params.id;
    if (!order || order._id !== orderID || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderID));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        getPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, match, dispatch, successPay, sdkReady]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message varaint='danger'>{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={8}>
          <h3>Order {order._id}</h3>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Address: </strong>
                <br />
                {order.shippingAddress.address},
                <br />
                {order.shippingAddress.city},
                <br />
                {order.shippingAddress.postCode},
                <br />
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant='flush'>
                <>
                  {order.orderItems.map((item) => (
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
                  <Col>
                    £{order.totalPrice - order.shippingPrice - order.taxPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>£{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>£{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>£{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
