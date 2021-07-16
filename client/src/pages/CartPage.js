import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { addToCart } from '../actions/cartActions';
const CartPage = () => {
  return (
    <div>
      <h2>Cart</h2>
    </div>
  );
};

export default CartPage;
