import * as React from 'react';
import { debounce } from 'lodash';
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache, ApolloClient, from } from "apollo-boost";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { useStateValue } from "../../../store";

const cache = new InMemoryCache();

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });

const authLink = setContext(async (_, context) => {
  let { headers } = context;
  const token = localStorage.getItem('userToken');
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return {
    ...context,
    headers,
  };
});

const GraphqlProvider = props => {
  const { dispatch } = useStateValue();
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    let errorString = '';
    if (graphQLErrors) {
      graphQLErrors.map(err => {
        errorString = errorString + err.message + '\n';
      });
    }
    if (networkError) {
      errorString = errorString + networkError.message + '\n';
    }
    alert(errorString);
    // dispatch({
    //   type: 'addToast',
    //   data: {
    //     toast: {
    //       type: 'error',
    //       message: `Error:\n${errorString}`,
    //     },
    //   },
    // });
  });
  const link = from([errorLink, authLink, httpLink]);
  const client = new ApolloClient({
    cache,
    link,
  });
  return (
    <ApolloProvider client={client} >
      {props.children}
    </ApolloProvider>
  )
}
export default GraphqlProvider;
