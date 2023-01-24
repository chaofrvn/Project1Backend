import { Sequelize } from "sequelize";
import Comment from "../model/commentModel.js";
export async function createComment(req, res) {
  const { author, commentBody, rating, docId } = req.body;
  const existingAuthor = Comment.findOne({
    where: {
      author: author,
    },
  });
  if (existingAuthor != null) {
    return res.status(400).json({ msg: "Người dùng đã bình luận" });
  }
  try {
    await Comment.create({
      author: author,
      commentBody: commentBody,
      rating: rating,
      docId: docId,
    }).then(() => {
      req.status(200).json({ msg: "Bình luận đã đăng thành công" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err.message });
  }
}
export async function getCommentOfAPost(req, res) {
  const docId = req.params();

  const comment = await Comment.findAll({
    where: {
      docId: docId,
    },
  })
    .then(() => {
      return res.status(200).json({
        msg: "Thành công",
        comment: comment,
      });
    })
    .catch((err) => {
      console.log("err: ", err.message);
      return res.status(400).json({ msg: err.message });
    });
}
export async function getAverageRating(req, res) {
  const docId = req.params();
  const rating = await Comment.findOne({
    where: { docId: docId },
    attributes: [[Sequelize.fn("AVG", Sequelize.col(rating)), "averageRating"]],
  })
    .then(() => {
      return res.status(200).json({
        averageRating: rating.averageRating,
      });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(400).json({ msg: err.message });
    });
}
export async function editComment(req, res) {
  const docId = req.params();
  const { author, commentBody, rating } = req.body;
  Comment.update(
    { commentBody: commentBody, rating: rating },
    { where: { docId: docId, author: author } }
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
