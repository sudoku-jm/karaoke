const express = require("express");
const cors = require("cors");
const http = require("http");
const MusicRouter = require("./routers/music");
const AdminRouter = require("./routers/admin");
const db = require("./models");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

//CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000"],
    // origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//라우터 분리
app.use("/music", MusicRouter);
app.use("/admin", AdminRouter);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.listen(PORT, () => {
  console.log("서버 실행 중");
});
