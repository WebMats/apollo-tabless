import gql from 'graphql-tag';


export const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!, $email: String, $phone: String) {
        login(inputUsername: $username, inputPassword: $password, email: $email, phone: $phone) {
            user {
                userId
                username
                email
            }
            token
            expiresIn
        }
    }
`;

// function primeAuthTimeout(expirationDate) {
//     setTimeout(() => {logout()}, (expirationDate)*1000);
// }


// // LOGOUT LOGIC
// function logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('expirationDate');
//     localStorage.removeItem('username');
// 	localStorage.removeItem('userId');
// }