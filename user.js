//express 모듈 세팅
const express = require("express");
const router = express.Router();
const conn = require("../mariadb"); //현재폴더의 상위 폴더

router.use(express.json());

router.post("/login", (req, res) => {
  const { email, password } = req.boby;
  let sql = `SELECT * FROM user WHERE email= ?`;

  conn.query(sql, email, function (err, results) {
    let loginUser = results[0];
    if (loginUser && loginUser.password == password) {
      res.status(202).json({
        message: `${loginUser.name} 로그인 완료`,
      });
    } else {
      res.status(404).json({
        message: "이메일 또는 비번이 틀렸습니다",
      });
    }
  });
});

router.post("/join", (req, res) => {
  if (req.body == {}) {
    res.status(404).json({
      message: "입력 값을 다시 확인해주세요.",
    });
  } else {
    const { email, name, password, contact } = req.body;

    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?)`;
    let values = [email, name, password, contact];
    conn.query(sql, values, function (err, results, fields) {
      res.status(201).json(results);
    });
  }
});
router
  .route("/users")
  .get((req, res) => {
    let { email } = req.body;
    let sql = `SELECT * FROM user WHERE email= ?`;
    conn.query(sql, email, function (err, results, fields) {
      if (results.length) res.status(200).json(results);
    });
  })
  .delete((req, res) => {
    let { email } = req.body;
    let sql = `DELETE FROM users WHERE email = ?`;
    conn.query(sql, email, function (err, results, fields) {
      res.status(200).json(results);
    });
  });
module.exports = router;
