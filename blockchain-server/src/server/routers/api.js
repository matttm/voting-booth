import express from 'express';
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Specify a resource in the URL');
});

router.get('/blocks', (req, res) => {
  // TODO: is there any checks to be done here?
  res.status(200).json({
    success: true,
    chain: []  // TODO: give real blockchain
  });
});

router.post('/blocks', (req, res) => {
  const block = req.body?.block;
  if (!block) {
    res.status(400).json({
      success: false,
      message: "Request did not contain a block"
    });
  }
  res.status(200).json({
    success: true,
    message: "Block added"
  });
});

router.get('/peers', (req, res) => {

});

router.post('peers', (req, res) => {

});

module.exports = router;
