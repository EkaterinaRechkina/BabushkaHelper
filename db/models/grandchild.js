'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grandchild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Grandchild.init({
    grandchild_name: DataTypes.STRING,
    password: DataTypes.STRING,
    granny_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Grandchild',
  });
  return Grandchild;
};