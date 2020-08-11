import express from 'express';

/**
 * This is a class that contains the actual request
 * handlers for the api route of the api app
 */
export class ApiRouter extends express.Router {
  constructor(blockchain) {
    super();
    this.blockchain = blockchain;
    this.configure();
  }

  /**
   * Setup routes for this router
   */
  configure() {
    this.get('/', function(req, res, next) {
      res.send('Specify a resource in the URL');
    });

    this.get('/blocks', (req, res) => {
      res.status(200).json({
        success: true,
        chain: JSON.stringify(this.blockchain.chain)
      });
    });

    this.post('/blocks', (req, res) => {
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

    this.get('/peers', (req, res) => {

    });

    this.post('peers', (req, res) => {

    });
  }
}

