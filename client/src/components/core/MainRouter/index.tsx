import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from '../../../store';
import PrivateRoute from 'components/core/PrivateRoute';
import AuthContainer from 'containers/AuthContainer';
import { Container, Typography } from '@material-ui/core';

const MainRouter: React.FC<{}> = props => {
  const { state: { viewer } } = useStateValue();
  const isAuthenticated = !!viewer;
  return (
    <Router>
      <Switch>
        <Route component={AuthContainer} path="/auth" />
        {
          // @ts-ignore
          <PrivateRoute render={() => {
            return (
              <Container>
                <Typography variant="body1">This is your dashboard now</Typography>
              </Container>
            )
          }} path="/dashboard" />
        }
      </Switch>
    </Router>
  );
};
export default MainRouter;
