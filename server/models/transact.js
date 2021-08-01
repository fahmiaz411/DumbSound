"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transact.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  transact.init(
    {
      startDate: DataTypes.DATE,
      dueDate: DataTypes.DATE,
      userId: DataTypes.INTEGER,
      attache: DataTypes.STRING,
      status: DataTypes.STRING,
      accountNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transact",
    }
  );
  return transact;
};
