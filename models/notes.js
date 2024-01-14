'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notes.init({
    name: DataTypes.STRING,
    header: DataTypes.STRING,
    details: DataTypes.DATE,
    importance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notes',
    timestamps:false
  });
  return Notes;
};