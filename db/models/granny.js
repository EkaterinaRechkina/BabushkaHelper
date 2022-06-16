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
      this.hasMany(models.Library, {
        foreignKey: 'granny_id',
      });
      this.hasMany(models.Grandchild, {
        foreignKey: 'name',
      });
    }
  }
  Granny.init({
    granny_name: DataTypes.STRING,
    
    password: DataTypes.STRING,
  
  }, {
    sequelize,
    modelName: 'Granny',
  });
  return Granny;
};
