import React, { useEffect, useState } from 'react';
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
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProductDetails,
  addProductReview,
} from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = ({ match, history }) => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [numReviews, setNumReviews] = useState(0);
  const [qty, setQty] = useState(1);

  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const userLoggedIn = () => {
    try {
      if (userInfo._id) {
        return true;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  const alreadyReviewed = (reviews, userId) => {
    const reviewed = reviews.find(
      (r) => r.user.toString() === userId.toString()
    );
    return reviewed;
  };

  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = useSelector((state) => state.productAddReview);

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successReview]);

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
        rating: initRating,
        numReviews: initNumReviews,
        reviews: initReviews,
      } = product;
      setName(initName);
      setDescription(initDescription);
      setCategory(initCategory);
      setBrand(initBrand);
      setPrice(initPrice);
      setImage(initImage);
      setCountInStock(initStockCount);
      setRating(initRating);
      setNumReviews(initNumReviews);
      setReviews(initReviews);
    } else if (error) {
      setMessage(error);
    }
  }, [product]);

  const addToCartHandler = () => {
    dispatch(addToCart(match.params.id, Number(qty)));
    history.push(`/cart`);
  };

  const uploadReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      addProductReview(match.params.id, {
        comment: userComment,
        rating: userRating,
      })
    );
  };

  return (
    <div>
      <LinkContainer fluid to='/'>
        <Button variant='dark' className='my-2'>
          Go Back
        </Button>
      </LinkContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={image} alt={name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={rating} text={`${numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>Price: £ {price}</ListGroup.Item>
                <ListGroup.Item>Description: {description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>£{price ? price : 0.0}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Available:</Col>
                      <Col>
                        <strong>{countInStock > 0 ? countInStock : 0}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}>
                            {[...Array(countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      disbaled={countInStock <= 0}
                      className='w-100'
                      onClick={addToCartHandler}>
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='my-4'>
            <Col md={8} className='mx-auto'>
              <h2>Reviews</h2>
              {numReviews.length === 0 && <Message>No Reviews</Message>}

              <ListGroup variant='flush'>
                <ListGroup.Item>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userLoggedIn() ? (
                    alreadyReviewed(reviews, userInfo._id) ? (
                      <Message>You have reviewed this product!</Message>
                    ) : (
                      <Form onSubmit={uploadReviewHandler} className='my-3'>
                        <h6>Write a review!</h6>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={userRating}
                            onChange={(e) => setUserRating(e.target.value)}>
                            <option value=''>Select....</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Bellow Average</option>
                            <option value='3'>3 - Average</option>
                            <option value='4'>4 - Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='rating' className='my-3'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            value={userComment}
                            onChange={(e) =>
                              setUserComment(e.target.value)
                            }></Form.Control>
                        </Form.Group>
                        <Button type='submit' className='my-3'>
                          Submit Review
                        </Button>
                      </Form>
                    )
                  ) : (
                    <Message>Please Log in to write a review</Message>
                  )}
                </ListGroup.Item>
                {reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                    <p>{review.createdAt.substring(0, 10)}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductPage;
