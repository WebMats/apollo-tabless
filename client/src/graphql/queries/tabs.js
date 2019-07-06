import gql from 'graphql-tag';

export const FETCH_TABS = gql`
    query FetchTabs {
        tabs {
            tabId
            tabUrl
            importance
        }
    }
`;