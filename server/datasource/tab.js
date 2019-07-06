const { normalizeTab }  = require('./shared');


class TabAPI {
    constructor(Tab) {
        this.Tab = Tab
        this.isAuthenticated = false;
    }

    initialize(config) {
        this.context = config.context
        this.isAuthenticated = !!this.context.userId
    }

    async fetchUserTabs() {
        let tabs = []
        if (this.isAuthenticated) {
            const fetchedTabs = ( await this.Tab.find({ creator: this.context.userId }) ) || [];
            tabs = fetchedTabs.map(normalizeTab);
        }
        return tabs;
    }

    async createNewTab({ tabUrl, importance, category }) {
        if (this.isAuthenticated) {
            try {
                const newTab = new this.Tab({
                    tabUrl,
                    importance,
                    category,
                    creator: this.context.userId
                })
                const tab = await newTab.save();
                return normalizeTab(tab)
            } catch (error) {
                return Error('Could not create tab')
            }
        }
        return Error('You must be signed in')
    }
    async deleteTab(id) {
        try {
            const { ok, deletedCount } = await this.Tab.deleteOne({ _id: id });
            if (deletedCount === 1 && ok === 1) {
                return id
            }
            return false
        } catch (error) {
            return false
            console.log(error)
        }
    }
}

module.exports = TabAPI;