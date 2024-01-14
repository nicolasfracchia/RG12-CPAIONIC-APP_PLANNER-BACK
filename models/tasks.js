'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    static associate(models) {
      Tasks.belongsTo(models.Status, {foreignKey:"status"})
    }
  }
  Tasks.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date_of_start: DataTypes.DATE,
    date_of_end: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tasks',
    timestamps:false
  });
  return Tasks;
};