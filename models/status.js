'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      Status.hasMany(models.Goals, {foreignKey:"status"})
      Status.hasMany(models.Tasks, {foreignKey:"status"})
    }
  }
  Status.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
    timestamps:false
  });
  return Status;
};