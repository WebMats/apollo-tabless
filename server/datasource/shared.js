const User = require('mongoose').model('User');

const normalizeUser = (user) => ({
    userId: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone
})

const user = async userId => {
    try {
      const user = await User.findById(userId);
      return normalizeUser(user)
    } catch (err) {
      throw err;
    }
  };

const normalizeTab = (tab) => ({
    tabId: tab.id,
    tabUrl: tab.tabUrl,
    importance: tab.importance,
    category: tab.importance,
    creator: user.bind(this, tab.creator),
})

module.exports = {
    normalizeTab,
    normalizeUser
}

