import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
const PublicRoute = ({
  component: Component,
  isAuthenticated,
  ...children
}) => {
  return (
    <Route
      render={(props) =>
        isAuthenticated ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} {...children} />
        )
      }
    />
  );
};

export default PublicRoute;
