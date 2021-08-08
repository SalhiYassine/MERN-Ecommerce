import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getAllOrders, shipOrder } from '../actions/orderAction';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const AdminOrderListPage = ({ history, location }) => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.orderList);
  const { success } = useSelector((state) => state.orderShip);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch, history, success]);

  const markAsShippedHandler = (order) => {
    console.log('shipped');
    Swal.fire({
      title: `Are you sure you want to mark  order : "${order._id}" as shipped?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark it as shipped!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(shipOrder(order._id));
        Swal.fire(
          'Shipped!',
          `The product "${order._id}" has been shipped.`,
          'success'
        );
      }
    });
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>shipped</th>
              <th>User</th>
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
                    <Button
                      onClick={() => markAsShippedHandler(order)}
                      variant='outline-dark'
                      className='btn-sm'>
                      Mark As Shipped
                    </Button>
                  )}
                </td>
                <td>{order.user.name}</td>
                <td>
                  <LinkContainer to={`/admin/orders/${order._id}`}>
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
    </>
  );
};

export default AdminOrderListPage;
