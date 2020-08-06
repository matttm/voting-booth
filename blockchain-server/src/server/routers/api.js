import express from 'express';
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Specify a resource in the URL');
});

router.get('/blocks', (req, res) => {

});

router.post('/blocks', (req, res) => {

});

router.get('/peers', (req, res) => {

});

router.post('peers', (req, res) => {

});

module.exports = router;
