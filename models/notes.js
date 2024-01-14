'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    static associate(models) {
      Notes.belongsTo(models.Priorities, {foreignKey:"importance"})
    }
  }
  Notes.init({
    name: DataTypes.STRING,
    header: DataTypes.STRING,
    details: DataTypes.STRING,
    importance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notes',
    timestamps:false
  });
  return Notes;
};