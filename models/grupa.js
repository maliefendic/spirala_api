'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grupa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Predmet);
      this.belongsTo(models.Aktivnost);
      this.belongsToMany(models.Student,{through:"GrupaStudent"});
    }
  };
  Grupa.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Grupa',
    timestamps:false,
    freezeTableName: true,
  });
  return Grupa;
};