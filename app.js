// Express 모듈을 불러오기
const express = require('express');
const app = express();

app.use(express.json());

// 라우팅 파일 불러오기
const swagRoutes = require('./routes/swag');

// 라우팅 설정
app.use('/swag', swagRoutes);

// 서버를 3000번 포트에서 실행
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
