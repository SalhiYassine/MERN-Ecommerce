import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserAdminList, deleteUserAdmin } from '../actions/userAction';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const AdminUserList = ({ history, location }) => {
  const dispatch = useDispatch();

  const { loading, success, error, userList } = useSelector(
    (state) => state.userAdminList
  );
  const { success: successDelete } = useSelector(
    (state) => state.userAdminDeleteUser
  );

  useEffect(() => {
    dispatch(getUserAdminList());
  }, [dispatch, history, successDelete]);

  const deleteHandler = (user) => {
    const { _id, name } = user;
    Swal.fire({
      title: `Are you sure you want to remove "${name}"`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserAdmin(_id));
        Swal.fire(
          'Deleted!',
          `The user "${name}" has been removed.`,
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
                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                      <Button variant='light'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button onClick={() => deleteHandler(user)} variant='light'>
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
