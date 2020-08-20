import express from 'express';

/**
 * This is a class that contains the actual request
 * handlers for the api route of the api app
 */
export const ApiRouter = (_blockchain) => {

  const router = express.Router();
  const blockchain = _blockchain;

  /**
   * Setup routes for this router
   */
  (function configure() {
    router.get('/', function(req, res, next) {
      res.send('Specify a resource in the URL');
    });

    router.get('/blocks', (req, res) => {
      res.status(200).json({
        success: true,
        chain: JSON.stringify(blockchain.chain)
      });
    });

    router.post('/blocks', (req, res) => {
      const data = req.body?.data;
      if (!data) {
        res.status(400).json({
          success: false,
          message: "Request did not contain a block"
        });
      }
      this.blockchain.addBlock(data);
      res.status(200).json({
        success: true,
        message: "Block added"
      });
    });

    router.get('/peers', (req, res) => {

    });

    router.post('/peers', (req, res) => {

    });
  })();
  return router;
};
