const express = require('express');
const router = express.Router();

// 라우터 설정
router.get('/', (req, res) => {
    res.status(200).send('Get swag');
});
  
router.post('//', (req, res) => {
res.status(200).send('Post swag');
});

// 루트 경로에 대한 GET 요청 처리
router.get('/:person', (req, res) => {
const person = req.params.person;
res.status(200).send(person);
});

module.exports = router;