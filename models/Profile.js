const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

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
  },
  {
    sequelize: db,
    modelName: "profile",
  }
);

module.exports = Profile;
