'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Predmet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Grupa);
      this.hasMany(models.Aktivnost);
     
    }
  };
  Predmet.init({
    naziv:{
     type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName:'predmet',
    modelName: 'Predmet',
    timestamps:false
  });
  return Predmet;
};