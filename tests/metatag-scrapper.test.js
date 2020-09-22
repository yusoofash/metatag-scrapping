const scraper = require('../services/scrapper.service');

test('should scrap basic meta tags', async () => {
    const html = `
    <title>Buy Now</title>
    <meta name="description" content="Buy my product">
    <meta name="keywords" content="Shopping Mart, products">
    `;

    const obj = scraper.parseMetaTagsFromHTML(html);
    expect(obj).toMatchObject({
        title: "Buy Now",
        description: "Buy my product",
        keywords: "Shopping Mart, products"
    });
});

test('should scrap og meta tags', async () => {
    const html = `
    <meta property="og:title" content="European Travel Destinations">
    <meta property="og:description" content="Offering tour packages for individuals or groups.">
    <meta property="og:image" content="http://euro-travel-example.com/thumbnail.jpg">
    <meta property="og:url" content="http://euro-travel-example.com/index.htm">
    `;

    const obj = scraper.parseMetaTagsFromHTML(html);
    expect(obj).toMatchObject({
        title: "European Travel Destinations",
        description: "Offering tour packages for individuals or groups.",
        url: "http://euro-travel-example.com/index.htm"
    });
});

test('should load array of images', async () => {
    const html = `
    <meta property="og:image" content="https://example.com/ogp.jpg" />
    <meta property="og:image" content="https://example.com/ogp123.jpg" />
    <meta property="og:image:secure_url" content="https://secure.example.com/ogp_ssl.jpg" />
    `;

    const obj = scraper.parseMetaTagsFromHTML(html);
    expect(obj).toMatchObject({
        images: [
            "https://example.com/ogp.jpg",
            "https://example.com/ogp123.jpg",
            "https://secure.example.com/ogp_ssl.jpg"
        ]
    });
});

test('should return og tags over regular tags', async () => {
    const html = `
    <meta name="description" content="Description of a site"/>
    <meta property="og:description" content="OG description of a site" />
    `;

    const obj = scraper.parseMetaTagsFromHTML(html);
    expect(obj).toMatchObject({
        description: "OG description of a site",
    });
});
