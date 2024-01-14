'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goals extends Model {
    static associate(models) {
      Goals.belongsTo(models.Status, {foreignKey:"status"})
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