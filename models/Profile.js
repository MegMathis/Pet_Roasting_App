const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const User = require("./User");

class Profile extends Model {}

Profile.init(
  {
    image: {
      //this string will need to be the image url
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 500],
      },
    },
    // maybe add this?
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize: db,
    modelName: "profile",
  }
);

// each profile has one user
Profile.hasOne(User, {
  foreignKey: "user_id",
});

module.exports = Profile;
