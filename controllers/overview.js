import User from "../model/userModel.js";
import Documents from "../model/docModel.js";
import sequelize, { fn } from "sequelize";
import moment from "moment/moment.js";
export async function userRatioOverview(req, res) {
  const result = await User.findAll({
    attributes: [
      "role",
      [sequelize.fn("COUNT", sequelize.col("role")), "number"],
    ],
    group: "role",
  });
  return res.status(200).json(result);
}
export async function documentOverview(req, res) {
  const { type } = req.query;
  console.log(type);
  const result = await Documents.findAll({
    attributes: [type, [sequelize.fn("COUNT", sequelize.col(type)), "number"]],
    group: type,
  });
  return res.status(200).json(result);
}
export async function numOfUserByDate(req, res) {
  const result = await User.findAll({
    order: [
      [
        sequelize.fn(
          "STR_TO_DATE",
          sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y"),
          "%d-%m-%Y"
        ),
      ],
    ],
    attributes: [
      [
        sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y"),

        "date",
      ],
      [
        sequelize.fn(
          "COUNT",

          sequelize.fn("date_format", sequelize.col("createdAt"), "%d-%m-%Y")
        ),
        "number",
      ],
    ],
    group: "date",
  });
  const today = moment();
  let number = 0;
  let Result = [];

  for (
    let date = moment(result[0].dataValues.date, "DD-MM-YYYY");
    // moment(result[0].dataValues.date, "DD-MM-YYYY") >
    // moment().subtract(31, "day")
    //   ? moment(result[0].dataValues.date, "DD-MM-YYYY")
    //   : moment().subtract(31, "day");
    date < today;
    date = date.add(1, "day")
  ) {
    console.log("for");
    let newUser = 0;
    result.forEach((obj) => {
      if (obj.dataValues.date == date.format("DD-MM-YYYY")) {
        newUser = obj.dataValues.number;
      }
    });
    number = number + newUser;
    Result.push({
      date: date.format("DD-MM-YYYY"),
      number: number,
    });
  }

  res.status(200).json(Result);
}
export async function numOfDocumentByDate(req, res) {
  const result = await Documents.findAll({
    order: [
      [
        sequelize.fn(
          "STR_TO_DATE",
          sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y"),
          "%d-%m-%Y"
        ),
      ],
    ],
    attributes: [
      [
        sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y"),

        "date",
      ],
      [
        sequelize.fn(
          "COUNT",

          sequelize.fn("date_format", sequelize.col("createdAt"), "%d-%m-%Y")
        ),
        "number",
      ],
    ],
    group: "date",
  });
  const today = moment();
  let number = 0;
  let Result = [];

  for (
    let date = moment(result[0].dataValues.date, "DD-MM-YYYY");
    // moment(result[0].dataValues.date, "DD-MM-YYYY") >
    // moment().subtract(31, "day")
    //   ? moment(result[0].dataValues.date, "DD-MM-YYYY")
    //   : moment().subtract(31, "day");
    date < today;
    date = date.add(1, "day")
  ) {
    console.log("for");
    let newUser = 0;
    result.forEach((obj) => {
      if (obj.dataValues.date == date.format("DD-MM-YYYY")) {
        newUser = obj.dataValues.number;
      }
    });
    number = number + newUser;
    Result.push({
      date: date.format("DD-MM-YYYY"),
      number: number,
    });
  }

  res.status(200).json(Result);
}
