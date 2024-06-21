'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    isadmin: DataTypes.BOOLEAN,
    hashed_password: DataTypes.STRING,
    about: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};