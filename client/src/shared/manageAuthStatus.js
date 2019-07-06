const checkAuthTimeout = (expirationDate, client) => {
	setTimeout(() => {logout(client)}, (expirationDate)*1000);
}

export const checkAuth = (client) => {
    const token = localStorage.getItem('token');
    if (!token) {
        logout(client)
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            logout(client);
        } else {
            checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000, client)
        }
    }
}

export const logout = (client) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    client.resetStore();
}