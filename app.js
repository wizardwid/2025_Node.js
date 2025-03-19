// Express 모듈을 불러옵니다.
const express = require('express');
const app = express();

app.use(express.json());

// 루트 경로에 대한 GET 요청 처리
app.get('/swag/:person', (req, res) => {
  const person = req.params.person;
  res.status(200).send(person);
});

// 서버를 3000번 포트에서 실행
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
