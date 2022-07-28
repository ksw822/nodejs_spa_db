const express = require("express");

const port = 3000;


// express 객체 선언, 각종 middleware 설치
const app = express();
app.use(express.json());

// mongoDB에 연결
const connect = require("./schemas");
connect();

// "/api" path로 연결하는 라우터 연결 (우선 routes/index.js로)
const indexRouter = require("./routes");
app.use("/api", [indexRouter]);


app.get("/", (req, res) => {
    res.send('main page');
  });
  

// 포트 열어서 Request Listening..
app.listen(port, () => {
  console.log(`${port} 번 포트로 연결이 완료되었습니다.`);
});