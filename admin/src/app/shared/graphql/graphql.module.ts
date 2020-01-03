import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpHeaders } from '@angular/common/http';

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri, withCredentials: true })
  const errorLink = onError((error) => {
    if (error.graphQLErrors) {
      console.error(`Graphql errors: \n${error.graphQLErrors.map(er => (er.message + ' ' + er.source)).join(`\n`)}`);
    }
    if (error.networkError) {
      console.error(`Network: ${error.networkError.message}`);
    }
  });
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    // console.log('authorization');

    const token = localStorage.getItem('userToken');
    if (token) {
      operation.setContext((operation, context) => ({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }));
    }
    return forward(operation);
  });
  return {
    link: from([authMiddleware, errorLink, http]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
