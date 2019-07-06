import React from 'react'
import AddTabForm from '../containers/add-tab-form';
import Loading from '../components/Loading/Loading';
import { Mutation, ApolloConsumer } from 'react-apollo'
import { CREATE_TAB } from '../graphql/mutations/tabs';

import './add-tab.scss';


const addTab = (props) => (
    <ApolloConsumer>
        {client => (
            <Mutation mutation={ CREATE_TAB } 
                onCompleted={( _ ) => {
                    props.history.replace('/my-tabs');
                }}
            >
                {(addTab, { loading, error }) => {
                    if (loading) return <Loading />;
                    if (error) return <p>ERROR</p>;
                    return (
                        <div className="AddTabContainer">
                            <h1>Add A New Tab! <span role="img" aria-label="jsx-a11y/accessible-emoji">🥳</span></h1>
                            <AddTabForm addTab={addTab} />
                        </div>
                    )
                }}
            </Mutation>
        )}
    </ApolloConsumer>
)

export default addTab
