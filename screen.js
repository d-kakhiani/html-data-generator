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
        let start = 1, end = 200;
        console.log('test')
        for (let index = start; index < end; index++) {
            let template = templates[index];
            const dir = `${root}\\${template}`;
            console.log(template)

            const pages = fs.readdirSync(dir);
            for (let pageUrl of pages) {
                if (pageUrl.includes('.html')) {
                    console.log(`${template}/${pageUrl}`);
                    // await page.goto(`http://127.0.0.1:1101/data/${template}/${pageUrl}`);
                    // await page.screenshot(
                    //     {
                    //       path: `./data/${template}_${pageUrl.replace('.html',
                    //           '')}.png`,
                    //       fullPage: true,
                    //     });
                }
            }
        }
        await browser.close();
    }
)();