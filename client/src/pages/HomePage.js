import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import products from '../products';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomePage = ({ match, history }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword, history]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product key={product._id} product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
