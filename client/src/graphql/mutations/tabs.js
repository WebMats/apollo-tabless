import gql from 'graphql-tag';


export const CREATE_TAB = gql`
    mutation CreateTab($tabUrl: String!, $importance: String, $category: String) {
        createTab(createTabInput: { tabUrl: $tabUrl, importance: $importance, category: $category}) {
            tabId
        }
    }
`;

export const DELETE_TAB = gql`
    mutation DeleteTab($tabId: ID!) {
        deleteTab(tabId: $tabId)
    }
`;