import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useStateValue } from 'store';
import { Viewer } from 'store/initialState';
import { FormGroup, Button, Input, Container, makeStyles, Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    alignItems: 'center',
    justifyContent: 'stretch',
  }
});

const AuthContainer: React.FC<RouteComponentProps<any> & {}> = props => {
  const { dispatch } = useStateValue();
  const [mutate, { loading }] = useMutation<{ login: { viewer: Viewer } }>(gql`
  mutation LogIn($input: LoginInput!) {
    login(input: $input) {
      viewer {
        id
        firstName
        lastName
        email
      }
    }
  }
  `, {
    onCompleted: data => {
      if (data) {
        dispatch({
          type: 'setViewer',
          payload: { viewer: data.login.viewer },
        })
        props.history.push('/dashboard')
      }
    }
  });
  const [email, setEmail] = React.useState('salines.sebastian@gmail.com');
  const [password, setPassword] = React.useState('demo1234');
  const login = () => {
    mutate({
      variables: {
        input: { email, password },
      },
    });
  };
  const classes = useStyles(props);
  return (
    <Container className={classes.container}>
      <FormGroup className={classes.formGroup}>
        <Typography variant="subtitle1" align="center">Dashboard</Typography>
        <TextField
          label="Email"
          className={classes.input}
          type="email"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        />
        <TextField
          label="Password"
          className={classes.input}
          type="password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
        />
        <Button onClick={login} disabled={loading}>Log In</Button>
      </FormGroup>
    </Container>
  )
};
export default AuthContainer;
