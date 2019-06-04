const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
        const root = `./generateData/data`;
        const templates = fs.readdirSync(root);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setViewport({
            width: 1200,
            height: 600,
        });
        let start = 2850, end = 2850;
        for (let index = start; index < end; index++) {
            let pageUrl = templates[index];
            // const dir = `${root}\\${template}`;
            console.log(pageUrl)

            // const pages = fs.readdirSync(dir);
            // for (let pageUrl of pages) {
                if (pageUrl && pageUrl.includes('.html')) {
                    console.log(`${pageUrl}`);
                    await page.goto(`http://127.0.0.1:8887/data/${pageUrl}`);
                    await page.screenshot(
                        {
                          path: `./data/${pageUrl.replace('.html',
                              '')}.png`,
                          fullPage: true,
                        });
                // }
            }
        }
        await browser.close();
    }
)();