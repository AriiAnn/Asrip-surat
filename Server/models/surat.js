'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class surat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  surat.init({
    tujuan: DataTypes.STRING,
    no_surat: DataTypes.STRING,
    perihal: DataTypes.STRING,
    tanggal: DataTypes.DATE,
    jenis: DataTypes.STRING,
    status: DataTypes.STRING,
    files: DataTypes.STRING,
    url: DataTypes.STRING,
    tipeFile: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'surat',
  });
  return surat;
};