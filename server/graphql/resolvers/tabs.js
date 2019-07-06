

module.exports.Query = {
    tabs: async ( _, __, { dataSources }) => (await dataSources.tabApi.fetchUserTabs()),
}

module.exports.Mutation = {
    createTab: async (_, { createTabInput }, { dataSources }) => (await dataSources.tabApi.createNewTab(createTabInput)),
    deleteTab: async (_, { tabId }, { dataSources }) => (await dataSources.tabApi.deleteTab(tabId))
}
