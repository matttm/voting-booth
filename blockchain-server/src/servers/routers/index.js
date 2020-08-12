import express from 'express';

/**
 * This class contains the request handlers for
 * the index of the api app
 */
export const IndexRouter = () => {
  const router = express.Router();

  /**
   * Setup routes for this router
   */
  (function configure() {
    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Election XXXX Blockchain Server' });
    });
  })();

  return router;
};
