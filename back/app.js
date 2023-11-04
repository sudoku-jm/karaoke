const express = require("express");
const http = require('http');
const db = require('./models'); 

const MusicRouter = require("./routers/music");
const app = express();

const PORT = 5500;


app.use(express.json());
app.use(express.urlencoded({extended : true}));

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
  

//라우터 분리
app.use('/music',MusicRouter);

app.get('/',(req, res) => {
    res.send('hello express');
  });

  
app.listen(PORT, () => {
    console.log('서버 실행 중');
  })