// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Custom Routing
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import AdminRoute from './routes/AdminRoute';
//Redux
import { useSelector } from 'react-redux';
// Components
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
// Pages
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import NotFound from './pages/NotFound';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentSelectionPage from './pages/PaymentSelectionPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import AdminUserList from './pages/AdminUserList';
import AdminUserEditPage from './pages/AdminUserEditPage';
import AdminProductListPage from './pages/AdminProductListPage';
import AdminProductEditPage from './pages/AdminProductEditPage';
import AdminOrderListPage from './pages/AdminOrderListPage';
const App = () => {
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
  console.log(userLoggedIn());

  return (
    <Router>
      <Header />
      <main className='py-3' style={{ minHeight: ' 80vh' }}>
        <Container>
          <Switch>
            {/* Routes */}
            <Route path={['/search/:keyword']} component={HomePage} />
            <Route
              path={['/', '/home', '/search']}
              exact
              component={HomePage}
            />
            <Route path={'/product/:id'} exact component={ProductPage} />
            <Route path={'/cart/:id?'} exact component={CartPage} />
            {/* Logged In */}
            <PrivateRoute
              isAuthenticated={userLoggedIn()}
              path={'/order/:id'}
              component={OrderPage}
            />
            <PrivateRoute
              isAuthenticated={userLoggedIn()}
              path={'/profile'}
              component={ProfilePage}
            />
            <PrivateRoute
              isAuthenticated={userLoggedIn()}
              path={'/shipping'}
              component={ShippingPage}
            />
            <PrivateRoute
              isAuthenticated={userLoggedIn()}
              path={'/payment'}
              component={PaymentSelectionPage}
            />
            <PrivateRoute
              isAuthenticated={userLoggedIn()}
              path={'/placeorder'}
              component={PlaceOrderPage}
            />
            {/* Admin && Logged In */}
            <AdminRoute
              path={'/admin/products'}
              isAuthenticated={userLoggedIn()}
              isAdmin={userAdmin()}
              component={AdminProductListPage}
              exact
            />
            <AdminRoute
              path={'/admin/products/:id/edit'}
              isAuthenticated={userLoggedIn()}
              isAdmin={userAdmin()}
              component={AdminProductEditPage}
            />
            <AdminRoute
              path={'/admin/orders'}
              isAuthenticated={userLoggedIn()}
              isAdmin={userAdmin()}
              component={AdminOrderListPage}
              exact
            />
            <AdminRoute
              path={'/admin/users'}
              isAuthenticated={userLoggedIn()}
              isAdmin={userAdmin()}
              component={AdminUserList}
              exact
            />
            <AdminRoute
              path={'/admin/users/:id'}
              isAuthenticated={userLoggedIn()}
              isAdmin={userAdmin()}
              component={AdminUserEditPage}
            />

            {/* Not Logged In */}
            <PublicRoute
              isAuthenticated={userLoggedIn()}
              path={'/login'}
              component={LoginPage}
            />
            <PublicRoute
              isAuthenticated={userLoggedIn()}
              path={'/register'}
              component={RegisterPage}
            />
            {/* Default Route if no urls are hit */}
            <Route path={['/404', '*']} exact component={NotFound} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
