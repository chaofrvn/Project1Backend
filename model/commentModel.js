import { Sequelize } from "sequelize";
import Documents from "./docModel.js";
import User from "./userModel.js";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const commentModel = db.define(
  "comment",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    commentBody: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Documents.hasMany(commentModel, {
  foreignKey: "docId",
});
User.hasMany(commentModel, { foreignKey: "author" });

export default commentModel;
