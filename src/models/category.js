const { DataTypes } = require("sequelize");

const db = require("../configs/db");
const validators = require("../shared/validators");

const Category = db.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: "already taken",
      },
      validate: {
        notNull: {
          msg: "required",
        },
        isNotEmptyString: validators.isNotEmptyString,
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Category;
