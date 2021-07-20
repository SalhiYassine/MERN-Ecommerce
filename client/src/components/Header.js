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
              <LinkContainer to='/cart' as='div'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>

              {/* User Logged In : */}
              {userInfo && (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile' as='div'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logOutHandler}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

              {/* User NOT Logged In : */}
              {!userInfo && (
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
