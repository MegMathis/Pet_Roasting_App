const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    }
  },
  {
    sequelize: db,
    modelName: "comment",
  }
);

Comment.sync();

module.exports = Comment;
