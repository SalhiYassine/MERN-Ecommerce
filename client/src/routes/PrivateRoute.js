import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...children
}) => {
  if (isAuthenticated) {
    return <Route {...children} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to='/login' />;
};

export default PrivateRoute;
