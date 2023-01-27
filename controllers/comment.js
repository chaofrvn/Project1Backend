import { Sequelize, Op } from "sequelize";
import Comment from "../model/commentModel.js";
import Users from "../model/userModel.js";
import roundTo2Digit from "../utils/roundTo2Digit.js";
export async function createComment(req, res) {
  const { commentBody, rating, docId } = req.body;
  const author = await getUserFromSession(req);
  const existingAuthor = await Comment.findOne({
    where: {
      author: author.id,
      docId: docId,
    },
  });
  if (existingAuthor && existingAuthor.id) {
    return res.status(400).json({ msg: "Người dùng đã bình luận" });
  }

  try {
    await Comment.create({
      author: author.id,
      commentBody: commentBody,
      rating: rating,
      docId: docId,
    }).then(() => {
      res.status(200).json({ msg: "Bình luận đã đăng thành công" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err.message });
  }
}
async function getUserFromSession(req) {
  return await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
}

export async function getCommentOfADocument(req, res) {
  const { docId } = req.params;
  const { other } = req.query;
  if (req.query.other) {
    const author = await getUserFromSession(req);
    await Comment.findAll({
      include: { model: Users, attributes: ["name", "id"] },
      where: {
        docId: docId,
        author: {
          [Op.not]: author.id,
        },
      },
    })
      .then((result) => {
        return res.status(200).json({
          msg: "Thành công",
          comment: result,
        });
      })
      .catch((err) => {
        console.log("err: ", err.message);
        return res.status(400).json({ msg: err.message });
      });
  } else {
    await Comment.findAll({
      include: { model: Users, attributes: ["name", "id"] },
      where: {
        docId: docId,
      },
    })
      .then((result) => {
        return res.status(200).json({
          msg: "Thành công",
          comment: result,
        });
      })
      .catch((err) => {
        console.log("err: ", err.message);
        return res.status(400).json({ msg: err.message });
      });
  }
}
export async function getAverageRating(req, res) {
  const { docId } = req.params;
  const rating = await Comment.findOne({
    where: { docId: docId },
    attributes: [
      [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"],
    ],
  })
    .then((result) => {
      return res.status(200).json({
        averageRating: roundTo2Digit(result.get("averageRating")),
      });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(400).json({ msg: err.message });
    });
}
export async function editComment(req, res) {
  const { docId } = req.params;
  const author = await getUserFromSession(req);
  const { commentBody, rating } = req.body;
  Comment.update(
    { commentBody: commentBody, rating: rating },
    { where: { docId: docId, author: author.id } }
  )
    .then(() => {
      return res.status(200).json({ msg: "Cập nhật thành công" });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(400).json({
        msg: err.message,
      });
    });
}
export async function getCommentOfCurrentUserOnADocunment(req, res) {
  const author = await getUserFromSession(req);

  const { docId } = req.params;
  Comment.findOne({
    include: { model: Users, attributes: ["name", "id"] },
    where: {
      author: author.id,
      docId: docId,
    },
  })
    .then((result) => {
      console.log(result);
      return res.status(200).json({ msg: "Thành công", comment: result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ msg: err.message });
    });
}
