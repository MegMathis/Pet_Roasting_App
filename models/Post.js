const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 75],
      },
    },
    url: {
       //this string will need to be the image url
       type: DataTypes.STRING,
       allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "post",
    freezeTableName: true,
  }
);

module.exports = Post;



// ,
//     image: {
//       //this string will need to be the image url
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     comment: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     likes: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },