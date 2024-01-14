'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Priorities extends Model {
    static associate(models) {
      Priorities.hasMany(models.Notes, {foreignKey:"importance"})
    }
  }
  Priorities.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Priorities',
    timestamps: false
  });
  return Priorities;
};