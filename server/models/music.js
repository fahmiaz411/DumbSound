"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      music.belongsTo(models.artist, {
        as: "artist",
        foreignKey: {
          name: "artistId",
        },
      });
    }
  }
  music.init(
    {
      title: DataTypes.STRING,
      year: DataTypes.INTEGER,
      artistId: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
      attache: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "music",
    }
  );
  return music;
};
