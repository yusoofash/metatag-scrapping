const { Router } = require('express');
const scrapperRoutes = require('./scrapper.route');
const cachingHandler = require('../middlewares/cachingHandler');

const router = Router();
router.use('/scrapper', cachingHandler, scrapperRoutes);

module.exports = router;
