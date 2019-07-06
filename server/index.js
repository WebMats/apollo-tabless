const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
// MONGOOSE MODELS
require('./models/Users');
require('./models/Tabs');
// INTERNAL APIs
const userAPI = require('./datasource/user'); 
const tabAPI = require('./datasource/tab');
const mongoose = require('mongoose');



const server = new ApolloServer({
    context: async ({ req }) => {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            return false;
        }
        const token = authHeader.split(' ')[1];
        if (!token || token === '') {
            return false;
        }
        return userAPI.decodeToken(token);
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
        userApi: new userAPI(mongoose.model('User')),
        tabApi: new tabAPI(mongoose.model('Tab'))
    })
})

mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.MONGODB_ATLAS_PW}@cluster0-b3gd5.mongodb.net/${process.env.MONGODB_ATLAS_DB}?retryWrites=true`, { useNewUrlParser: true, useCreateIndex: true }).then(() => {
    console.log('connection to Atlas was successful...')
    server.listen(5000).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
}).catch(err => {
    console.log(err);
});

