import React, { FunctionComponent } from 'react';
import { useStateValue } from '../../../store';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component:
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { state: { isAuthenticated } } = useStateValue();
  return isAuthenticated ? <Route {...rest} /> : <Redirect to={{ pathname: '/auth' }} />;
};
export default PrivateRoute;