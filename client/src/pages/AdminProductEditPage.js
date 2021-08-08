import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { editProduct, listProductDetails } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { PRODUCT_EDIT_RESET } from '../constants/productConstants';
import axios from 'axios';

const AdminProductEditPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { success: updatedProductSuccess, error: updateError } = useSelector(
    (state) => state.productEdit
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, history, updatedProductSuccess]);

  useEffect(() => {
    if (loading == false && !error) {
      const {
        name: initName,
        description: initDescription,
        category: initCategory,
        brand: initBrand,
        price: initPrice,
        image: initImage,
        countInStock: initStockCount,
      } = product;
      setName(initName);
      setDescription(initDescription);
      setCategory(initCategory);
      setBrand(initBrand);
      setPrice(initPrice);
      setImage(initImage);
      setCountInStock(initStockCount);
    } else if (error) {
      setMessage(error);
    }
  }, [product]);

  useEffect(() => {
    if (updatedProductSuccess) {
      const {
        name: initName,
        description: initDescription,
        category: initCategory,
        brand: initBrand,
        price: initPrice,
        image: initImage,
        countInStock: initStockCount,
      } = product;
      setName(initName);
      setDescription(initDescription);
      setCategory(initCategory);
      setBrand(initBrand);
      setPrice(initPrice);
      setImage(initImage);
      setCountInStock(initStockCount);
      let timerInterval;
      Swal.fire({
        title: 'Product Updated!',
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
          dispatch({ type: PRODUCT_EDIT_RESET });
          history.push(`/admin/products`);
        }
      });
    }
    if (updateError) {
      setMessage(updateError);
    }
  }, [updatedProductSuccess, updateError]);

  const handleSubmit = () => {
    dispatch(
      editProduct(match.params.id, {
        name,
        description,
        category,
        brand,
        price,
        image,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      console.log(data);
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <FormContainer>
      <h1>Edit Product</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form>
          <Form.Group controlId='name' className='my-3'>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Product Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='description' className='my-3'>
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Product description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='category' className='my-3'>
            <Form.Label>Product Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Product Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='brand' className='my-3'>
            <Form.Label>Product Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Product Brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='price' className='my-3'>
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type='text'
              placeholder='Product Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='image' className='my-3'>
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Product Image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.File
              id='iamge-file'
              label='Choose an Image'
              custom
              onChange={uploadFileHandler}></Form.File>
            {uploading && <Loader />}
          </Form.Group>
          <Form.Group controlId='Stock' className='my-3'>
            <Form.Label>Product Stock</Form.Label>
            <Form.Control
              type='text'
              placeholder='Product Stock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>

          <Button onClick={handleSubmit} className='my-3' variant='primary'>
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default AdminProductEditPage;
