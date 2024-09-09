//express 모듈 세팅
const express = require("express");
const app = express();
app.listen(7777);
app.use(express.json);

let db = new Map();
let id = 1;

//로그인post /login
app.post("/login", (req, res) => {
  //유저 아이디가 디비에 저장된 회원인지 확인하기
  const { userId, password } = req.boby;
  let hasUserId = false;

  db.forEach(function (user, id) {
    if (user.userId == userId) {
      console.log("같은 거 찾음");
      hasUserId = true;

      //비밀번호도 맞는지 확인하기
      if (user.password === password) {
        console.log("패스워드도 같다");
      } else {
        console.log("패스워드는 틀렸다");
      }
    }
  });
  //유저 아이디 일치 값을 못 찾는 경우
  if (!hasUserId) {
    console.log("입력하신 아이디는 없느 아이디임!");
  }
});

//회원 가입post /join
app.post("/join", (req, res) => {
  db.set(id++, req.body);

  if (req.body == {}) {
    res.status(404).json({
      message: "입력 값을 다시 확인해주세요.",
    });
  } else {
    res.status(201).json({
      message: `${db.get(id - 1).name}님 환영합니다.`,
    });
  }
});
app
  .route("/users/:id")
  .get((req, res) => {
    let id = parseInt(req.params);

    const user = db.get(id);
    if (user == undefined) {
      res.status(400).json({
        message: "회원 정보 없음",
      });
    } else {
      res.status(200).json({
        userId: user.id,
        name: user.name,
      });
    }
  })
  .delete((req, res) => {
    let id = parseInt(req.params);
    const user = db.get(id);

    if (user == undefined) {
      res.status(400).json({
        message: "회원 정보 없음",
      });
    } else {
      db.delete(id);
      res.status(200).json({
        message: `${user.name}님 다음에 또 봐~~~`,
      });
    }
  });
