const Post = require('./Post')
const Profile = require('./Profile')
const User = require('./User')

User.hasOne(Profile, {
  foreignKey: "user_id",
});

Profile.belongsTo(User, {
  foreignKey: "user_id"
})

module.exports = {
  Post,
  Profile,
  User
};