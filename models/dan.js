'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Aktivnost);
    }
  };
  Dan.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dan',
    timestamps:false,
    freezeTableName:true
  });
  return Dan;
};