const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/connection');

class User extends Model {
  async validatePass(provided_password) {
    const is_valid = await bcrypt.compare(provided_password, this.password);

    return is_valid;
  }
}
//create a username field
User.init({
  email: {
    type: DataTypes.STRING,
    unique: {
      arg: true,
      msg: 'That email address is already in use.'
    },
    validate: {
      isEmail: {
        args: true,
        msg: 'You must enter a valid email address.'
      }
    },
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: 6,
        msg: 'Your password must be at least 6 characters in length.'
      }
    },
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'user',
  hooks: {
    async beforeCreate(user) {
      const encrypted_pass = await bcrypt.hash(user.password, 10);

      
      user.password = encrypted_pass;
    }
  }
});

module.exports = User;