const userResolver = require('./user');
const tabsResolver = require('./tabs');

module.exports = {
    Mutation: {
        ...userResolver.Mutation,
        ...tabsResolver.Mutation
    },
    Query: {
        ...tabsResolver.Query,
        ...userResolver.Query,
    }
}