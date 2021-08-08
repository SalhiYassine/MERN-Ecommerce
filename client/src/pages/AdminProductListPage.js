import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';

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

  const {
    loading: createLoading,
    product: createProductResponse,
    success: createSuccess,
    error: createError,
  } = useSelector((state) => state.productCreate);

  const createHandler = () => {
    Swal.fire({
      title: `Are you sure you want to create a new product?`,
      text: 'You will be redirected.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(createProduct());
      }
    });
  };
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
    if (deleteSuccess) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    if (createSuccess) {
      let timerInterval;
      Swal.fire({
        title: 'Product Created!',
        html: 'You are being redirected.',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {}, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          dispatch({ type: PRODUCT_CREATE_RESET });
          history.push(`/admin/products/${createProductResponse._id}/edit`);
        }
      });
    }
  }, [dispatch, history, deleteSuccess, createSuccess]);

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button
            onClick={createHandler}
            variant='dark'
            size='xl'
            className='my-3 '>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteError && <Message variant='danger'>{deleteError}</Message>}
      {createError && <Message variant='danger'>{createError}</Message>}
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
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
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
