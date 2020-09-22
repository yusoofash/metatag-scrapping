const request = require('superagent');
const APIError = require('../classes/APIError');
const cheerio = require('cheerio');

/**
 * Scrap for meta tags from a web URL
 * 
 * If page contains og parameters, we return all the og parameters
 * @param {string} url web URL
 */
const metaTagScrapper = async (url) => {
    if (!url) {
        throw new APIError(400, 'Please send the URL');
    }

    const html = await fetchHTMLText(url);

    return parseMetaTagsFromHTML(html);
};

const fetchHTMLText = async (url) => {
    const res = await request
        .get(url);
    if (res.status !== 200) {
        throw new APIError(400, 'Failed to fetch contents from the given URL');
    }

    return res.text;
};

const parseMetaTagsFromHTML = (htmlText) => {
    const $ = cheerio.load(htmlText);
    const obj = {};

    for (const [name, ruleSet] of Object.entries(metatagRuleSet)) {
        for (const rule of ruleSet.rules) {
            const prop = rule[1];
            const selector = rule[0];

            if (ruleSet.isArray) {
                $(selector).each((index, element) => {
                    const data = prop(element);
                    if (data) {
                        obj[name] = [...(obj[name] || []), data];
                    }
                });
            } else {
                const data = prop(
                    $(selector)
                );
                if (data) {
                    obj[name] = data;
                    break;
                }
            }
        }
    }

    return obj;
}

/**
 * Extend functionality by adding selector and the appropiate method call to fetch content
 */
const metatagRuleSet = {
    title: {
        rules: [
            ['meta[property="og:title"]', element => element.attr("content")],
            ['meta[name="twitter:title"]', element => element.attr("content")],
            ['meta[property="twitter:title"]', element => element.attr("content")],
            ['meta[name="hdl"]', element => element.attr("content")],
            ['title', element => element.text()],
        ],
    },
    type: {
        rules: [
            ['meta[property="og:type"]', element => element.attr("content")],
        ],
    },
    description: {
        rules: [
            ['meta[property="og:description"]', element => element.attr("content")],
            ['meta[name="description"]', element => element.attr("content")],
        ],
    },
    images: {
        rules: [
            ['meta[property="og:image"]', element => element.attribs['content']],
            ['meta[property="og:image:secure_url"]', element => element.attribs['content']],
            ['meta[property="og:image:url"]', element => element.attribs['content']],
        ],
        isArray: true,
    },
    keywords: {
        rules: [
            ['meta[name="keywords" i]', element => element.attr("content")],
        ],
    },
    url: {
        rules: [
            ['meta[property="og:url"]', element => element.attr("content")],
        ],
    },
};

module.exports = {
    metaTagScrapper,
    parseMetaTagsFromHTML,
}
