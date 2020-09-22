const { metaTagScrapper } = require('../services/scrapper.service');

const postMetaTagScrapper = async (req, res, next) => {
    try {
        const data = await metaTagScrapper(req.body.url);

        res.json(data);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    postMetaTagScrapper,
}
