'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Granny extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Granny.init({
    granny_name: DataTypes.STRING,
    password: DataTypes.STRING,
    grandchild_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Granny',
  });
  return Granny;
};