import User from "../model/userModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "Không tìm thấy tài khoản" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Sai mật khẩu" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "Không tìm thấy tài khoản" });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "faild logout" });
    res.status(200).json({ msg: "logout success" });
  });
};

export const register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (name == "" || email == "" || password == "" || confPassword == "") {
    return res.status(400).json({ msg: "Các thông tin không được để trống" });
  }
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Mật khẩu và xác nhận mật khẩu chưa trùng khớp" });
  }
  const existedEmail = await User.findOne({
    where: {
      email: email,
    },
  });
  if (existedEmail != null) {
    return res.status(400).json({
      msg: "Email đã tồn tại",
    });
  }
  const hashPassword = await argon2.hash(password);

  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Register Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
