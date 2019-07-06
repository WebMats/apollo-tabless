import React from 'react'
import { ApolloConsumer } from 'react-apollo';
import { Redirect } from 'react-router-dom'
import { logout } from '../shared/manageAuthStatus';


const logoutComponent = () => (
        <ApolloConsumer>
            {client => {
                    logout(client)
                    return <Redirect to="/authenticate" />
                }}
            </ApolloConsumer>
        )
        
export default logoutComponent;