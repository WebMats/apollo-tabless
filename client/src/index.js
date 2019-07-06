// ===============================================================  // STYLING
import App from './App';
import './index.css';
// =============================================================== // REACT
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthenticationPage from './pages/authenticate';
import Layout from './hoc/Layout/Layout';
// =============================================================== // APOLLO
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { IS_LOGGED_IN } from './graphql/queries/user';


const cache = new InMemoryCache();

const httpLink = createHttpLink({ uri: '/api/graphql' });

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})

const client = new ApolloClient({
    cache,
    typeDefs,
    resolvers,
    link: authLink.concat(httpLink),
})

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token'),
        tags: []
    }
})

const unAuthenticatedRoutes = (
    <Switch>
        <Route path="/authenticate" component={AuthenticationPage} />
        <Redirect to='/authenticate' />
    </Switch>
)

const app = (
    <ApolloProvider client={client} >
        <BrowserRouter>
            <Query query={IS_LOGGED_IN}>
                {({ data }) => (<Layout showProtectedLinks={data.isLoggedIn}>{data.isLoggedIn ? <App /> : unAuthenticatedRoutes}</Layout>)}
            </Query>
        </BrowserRouter>
    </ApolloProvider>
)


ReactDOM.render(app , document.getElementById('root'));