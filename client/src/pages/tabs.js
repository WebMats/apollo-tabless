import React from 'react';

import Loading from '../components/Loading/Loading';
import UserTabs from '../containers/user-tabs';
import { ApolloConsumer, Query, Mutation } from 'react-apollo';
import { FETCH_TABS } from '../graphql/queries/tabs';
import { DELETE_TAB } from '../graphql/mutations/tabs';

const tabs = () => (
    <ApolloConsumer>
        {client => (
            <Query query={FETCH_TABS} fetchPolicy="network-only">
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (error) return <p>ERROR</p>;
                    client.writeData({ data: { tabs: data.tabs } })
                    return (
                        <Mutation mutation={DELETE_TAB}
                            onCompleted={( {deleteTab: id} ) => {
                                console.log(id)
                            }}
                        >
                            {(deleteTab, { loading, error }) => {
                                if (loading) return <Loading />;
                                if (error) return <p>ERROR</p>;
                                return <UserTabs deleteTab={deleteTab} tabs={data.tabs} />
                            }}
                        </Mutation>
                    )
                }}
            </Query>
        )}
    </ApolloConsumer>
)


export default tabs;