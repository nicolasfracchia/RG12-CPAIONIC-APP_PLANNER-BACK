'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Goals.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date_of_start: DataTypes.DATE,
    date_of_end: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Goals',
    timestamps:false
  });
  return Goals;
};