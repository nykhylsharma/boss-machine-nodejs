const express = require('express');
const apiRouter = express.Router();

//require and use minionsRouter
const minionsRouter = require('./minions');
apiRouter.use('/minions', minionsRouter);

//required and use ideasRouter
const ideasRouter = require('./ideas');
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
