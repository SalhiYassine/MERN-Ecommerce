import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const AdminProductListPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector(
    (state) => state.productList
  );
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state) => state.productDelete);

  const deleteHandler = (product) => {
    const { _id, name } = product;
    Swal.fire({
      title: `Are you sure you want to delete "${name}"`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(_id));
        Swal.fire(
          'Deleted!',
          `The product "${name}" has been deleted.`,
          'success'
        );
      }
    });
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, history, deleteSuccess]);

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button variant='dark' size='xl' className='my-3 '>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteError && <Message variant='danger'>{deleteError}</Message>}
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
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <>
                <tr key={product._id} className=''>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>£{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      onClick={() => deleteHandler(product)}
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

export default AdminProductListPage;
