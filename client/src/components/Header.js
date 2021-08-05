import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { logOut } from '../actions/userAction';
import { useDispatch } from 'react-redux';

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
  };

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
  const userAdmin = () => {
    try {
      if (userLoggedIn() && userInfo.isAdmin) {
        return true;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>YS Commerce</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart' as='div' className='me-3'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>

              {/* User Admin : */}
              {userAdmin() && (
                <>
                  <NavDropdown title={'admin'} id='admin' className='me-3'>
                    <LinkContainer to='/admin/users' as='div'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/products' as='div'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

              {/* User Logged In : */}
              {userLoggedIn() && (
                <>
                  <NavDropdown
                    className='m-0'
                    title={userInfo.name}
                    id='username'>
                    <LinkContainer to='/profile' as='div' className='me-3'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logOutHandler}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

              {/* User NOT Logged In : */}
              {!userLoggedIn() && (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
