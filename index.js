import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/database.js";
// import Users from "./model/userModel.js";
// import Docs from "./model/docModel.js";
import SequelizeStore from "connect-session-sequelize";

import authRoute from "./routes/authRoute.js";
import documentRoute from "./routes/documentRoute.js";
import userRoute from "./routes/userRoute.js";
import commentRoute from "./routes/commentRoute.js";
import argon2 from "argon2";
dotenv.config();

const app = express();
const port = process.env.PORT || 4688;

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync({ alter: true });
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// store.sync();

app.use(express.json());
app.use(commentRoute);
app.use(userRoute);
app.use(documentRoute);
app.use(authRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
