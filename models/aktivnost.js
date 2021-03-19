'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aktivnost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Predmet);
      this.hasMany(models.Grupa,{allowNull:true});
      this.hasMany(models.Tip);
      this.hasMany(models.Dan);
    }
  };
  Aktivnost.init({
    naziv: DataTypes.STRING,
    pocetak: DataTypes.FLOAT,
    kraj: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Aktivnost',
    timestamps:false,
    freezeTableName:true
  });
  return Aktivnost;
};