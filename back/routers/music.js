const express = require("express");
const { Board, Category } = require("../models");
const router = express.Router();

router.get("/test", (req, res, next) => {
  try {
    res.send("hello express test");
  } catch (error) {
    console.error(error);
    next(error); //status(500) 500번 에러. 서버쪽 에러
  }
});

//music/insertMusic : 노래방 곡 추가|수정 신청.
router.post("/insert", async (req, res, next) => {
  try {
    //카테고리 아이디가 빈값으로 왔을 경우, 카테고리 이름 = 카테고리 DB 검사 후 같은게 있을 경우 CategoryId 매칭. 없으면 빈값.
    // let cateId = "";
    // if(req.body.categoryId == ""){
    //   cateId = await Category.findOne({
    //     where : {
    //       name : req.body.category,
    //     },
    //     include : [{
    //       model : 'Category',
    //       attributes :['id']
    //     }]
    //   });
    // }else{
    //   cateId = await Category.findOne({
    //     where : {
    //       id : req.body.categoryId,
    //     },
    //     include : [{
    //       model : 'Category',
    //       attributes :['id']
    //     }]
    //   });
    // }

    // if(cateId.length < 1){
    //   cateId = "";
    // }

    // let form = {
    //   category : req.body.category,
    //   CategoryId : cateId,
    //   title : req.body.title,
    //   singer : req.body.singer,
    //   keumyong : req.body.keumyong,
    //   taejin : req.body.taejin,
    //   link : req.body.link,
    //   contents: req.body.contents,
    // }
    // //musicId가 없으면 새로 작성.
    // if(req.body.musicId !== ""){
    //   form.MusicId = req.body.musicId;
    //   form.new = 'N'; //수정 요청
    // }//musicId가 있으면 수정 요청.

    // // 게시글 추가.
    // await Board.create({
    //   ...form
    // });

    console.log("오니?");
    res.status(200).json({
      // new: form.new,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
