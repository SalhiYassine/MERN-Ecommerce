// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Custom Routing
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
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

const App = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <Router>
      <Header />
      <main className='py-3' style={{ minHeight: ' 80vh' }}>
        <Container>
          <Switch>
            {/* Routes */}
            <Route path={['/', '/home']} exact component={HomePage} />
            <Route path={'/product/:id'} exact component={ProductPage} />
            <PublicRoute
              isAuthenticated={userInfo}
              path={'/login'}
              exact
              component={LoginPage}
            />
            <Route path={'/cart/:id?'} exact component={CartPage} />
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
