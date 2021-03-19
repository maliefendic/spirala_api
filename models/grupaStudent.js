'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrupaStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GrupaStudent.init( {},{
    sequelize,
    modelName: 'GrupaStudent',
    timestamps:false,
    freezeTableName:true
  });
  return GrupaStudent;
};