const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
      const root = `C:\\Users\\datok\\Desktop\\upload\\upload`;
      // const root = `C:\\Users\\datok\\Desktop\\upload\\test`;
      const templates = fs.readdirSync(root);

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      page.setViewport({
        width: 1200,
        height: 600,
      });
      let start = 101, end = 200;
      for (let index = start; index <= end; index++) {
        let template = templates[index];
        const dir = `${root}\\${template}`;

        const pages = fs.readdirSync(dir);
        for (let pageUrl of pages) {
          if (pageUrl.includes('.html')) {
            console.log(`${template}/${pageUrl}`);
            await page.goto(`http://127.0.0.1:8887/${template}/${pageUrl}`);
            await page.screenshot(
                {
                  path: `./data/${template}_${pageUrl.replace('.html',
                      '')}.png`,
                  fullPage: true,
                });
          }
        }
      }
      await browser.close();
    }
)();