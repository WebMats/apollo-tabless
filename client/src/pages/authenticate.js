import React from 'react'
import { withRouter } from 'react-router-dom';
import { LOGIN_USER } from '../graphql/mutations/authentication';
import AuthForm from '../containers/auth-form';
import Loading from '../components/Loading/Loading';
import bookMarkSVG from '../assets/images/bookmarks.svg'
import checkingSVG from '../assets/images/checking_boxes.svg';
import { Mutation, ApolloConsumer } from 'react-apollo'
import './authenticate.scss';

const authenticate = (props) => (
    <ApolloConsumer>
        {client => (
            <Mutation mutation={ LOGIN_USER }
                onCompleted={async ({ login }) => {
                    const expirationDate = new Date(new Date().getTime() + login.expiresIn * 60000)
                    await localStorage.setItem('token', login.token)
                    await localStorage.setItem('expirationDate', expirationDate)
                    await localStorage.setItem('userId', login.user.userId)
                    client.writeData({ data: { isLoggedIn: true, user: {...login.user} } });
                    props.history.push('/my-tabs');
                }}
            >
                {(login, { loading, error }) => {
                    if (loading) return <Loading />;
                    if (error) return <p>ERROR</p>;
                    return (
                        <div className="AuthPageContainer">
                            <div className="BookmarkSVGContainer">
                                <img src={bookMarkSVG} alt="bookmarks" />
                            </div>
                            <AuthForm login={login} />
                            <div className="CheckingSVGContainer">
                                <img src={checkingSVG} alt="bookmarks" />
                            </div>
                        </div>
                    )
                }}
            </Mutation>
        )}
    </ApolloConsumer>
)


export default withRouter(authenticate);