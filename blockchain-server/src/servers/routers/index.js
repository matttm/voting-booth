import express from 'express';

/**
 * This class contains the request handlers for
 * the index of the api app
 */
export class IndexRouter extends express.Router {
  constructor() {
    super();
    this.configure();
  }

  /**
   * Setup routes for this router
   */
  configure() {
    /* GET home page. */
    this.get('/', function(req, res, next) {
      res.render('index', { title: 'Election XXXX Blockchain Server' });
    });
  }
}

