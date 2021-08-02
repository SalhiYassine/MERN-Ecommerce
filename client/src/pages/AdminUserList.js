import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserAdminList } from '../actions/userAction';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';

const AdminUserList = ({ history, location }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAdminList());
  }, [dispatch]);

  const { loading, success, error, userList } = useSelector(
    (state) => state.userAdminList
  );

  const deleteHandler = (id) => {};

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm text-center'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <>
                <tr key={user._id} className=''>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className='vertical-align:center'>
                    {user.isAdmin ? (
                      <i
                        style={{ color: 'green' }}
                        className='fas fa-check my-auto'></i>
                    ) : (
                      <i style={{ color: 'red' }} className='fas fa-times'></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/users/${user._id}/edit`}>
                      <Button variant='light'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      onClick={() => deleteHandler(user._id)}
                      variant='light'>
                      <i style={{ color: 'red' }} className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminUserList;
