
module.exports.Mutation = {
    login: async ( _, loginData, { dataSources } ) => {
        const credentials = await dataSources.userApi.findOrCreateUser(loginData)
        if (!credentials) {
            throw Error('It was not possible to authenticate you.');
        }
        return credentials
    }
}
