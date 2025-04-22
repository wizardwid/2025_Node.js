const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/add', (req, res) => {
    res.render('addTravel');
});

router.get('/', async(req, res) => {
    try{
        const _query = 'SELECT id, name FROM travellist';
        const [results] = await db.query(_query);
        const travelList = results;
        res.render('travel', { travelList });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패');
        res.status(500).send('Internal Server Error');
    }     
});

router.get('/:id', async(req, res) => {
    try{
        const travelID = req.params.id;
        const _query = 'SELECT * FROM travellist WHERE id = ?';
        const [results] = await db.query(_query, travelID);
        const travel = results[0];
        if (results.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다');
            return;
        }
        res.render('travelDetail', { travel });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패');
        res.status(500).send('Internal Server Error');
    }     
});

router.post('/', async(req, res) => {
    const { name } = req.body;
    try{
        const _query = 'INSERT INTO travellist (name) VALUES (?)';
        await db.query(_query, [name]);
        res.redirect('/travel');
    } catch (err){
        console.error('데이터베이스 쿼리 실패');
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async(req, res) => {
    const travelID = req.params.id;
    const { name } = req.body;
    try{
        const _query = 'UPDATE travellist SET name = ? WHERE id = ?';
        await db.query(_query, [name, travelID])
        res.render('updateSuccess');
    } catch (err){
        console.error('DB 쿼리 실패', err);
        res.status(500).send('내부 서버 에러');
    }
})

router.delete('/:id', async(req, res) => {
    const travelID = req.params.id;
    try{
        const _query = 'DELETE FROM travellist WHERE id = ?';
        const [results] = await db.query(_query, [travelID])
        if (results.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다');
            return;
        }
        res.render('deleteSuccess');
    } catch (err){
        console.error('DB 쿼리 실패', err);
        res.status(500).send('내부 서버 에러');
    }
})

router.get('/:id/edit', async(req, res) => {
    const travelID = req.params.id;
    try{
        const _query = 'SELECT * FROM travellist WHERE id = ?';
        const [results] = await db.query(_query, [travelID])
        if (results.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다');
            return;
        }
        const travel = results[0];
        res.render('editTravel', { travel });
    } catch (err){
        console.error('DB 쿼리 실패', err);
        res.status(500).send('내부 서버 에러');
    }
})

module.exports = router;
