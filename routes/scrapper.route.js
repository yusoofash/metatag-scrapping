const { Router } = require('express');
const scrapperController = require('../controllers/scrapper.controller');

const router = Router();
router.post('/', scrapperController.postMetaTagScrapper);

module.exports = router;
