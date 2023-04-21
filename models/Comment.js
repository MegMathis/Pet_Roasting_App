const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "comment",
  }
);

module.exports = Comment;
