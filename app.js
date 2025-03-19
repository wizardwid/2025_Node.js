// Express 모듈을 불러옵니다.
const express = require('express');
const app = express();

app.use(express.json());

// 루트 경로에 대한 GET 요청 처리
app.post('/swag', (req, res) => {
  // 클라이언트에게 응답 내용 전송
  res.send(req.body);
});

// 서버를 3000번 포트에서 실행
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
