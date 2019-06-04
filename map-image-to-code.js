const fs = require('fs');
const root = './generateData/data/';
let templates = fs.readdirSync(root);
const tokens = require('./generateData/tokens.json');

for (let templateId of templates) {
  let tokenizedHtml = '.header.style';
  // console.log(root+template)
  const html = (fs.readFileSync(root + templateId)).toString();
  // console.log(html.length);
  const formRegex = new RegExp(
      `<div class="form">.*<\\/vaadin-form-layout>\\n<\\/div>`, 's');
  if (formRegex.test(html)) {
    let formData = html.match(formRegex);
    if (formData && formData.length >= 1) {
      formData = formData[0].toString();
      tokenizedHtml += '.form{';
      const formItemRegex = new RegExp('<vaadin-button\\s(disabled|theme)|<vaadin.*?[\\s|>|]', 'g');
      for (let formField of formData.match(formItemRegex)) {
        let tokenName = '';
        for (let key in tokens) {
          if (key === 'form') continue;
          let value = tokens[key];
          if (value.includes(formField)) {
            tokenName = `.${key}`;
          }
        }
        tokenizedHtml += tokenName;
      }
      tokenizedHtml += '}';
    }
  }
  const cardsLayoutRegex = new RegExp(
      '<\\/vaadin-form-layout>\\n<\\/div>(.*?)<\\/body>', 's');
  if (cardsLayoutRegex.test(html)) {
    let cardsLayout = html.match(cardsLayoutRegex);
    if (cardsLayout && cardsLayout.length >= 1) {
      cardsLayout = cardsLayout[1].toString();

      let cardsBlockRegex = new RegExp(
          'grid-gap: 32px">(.*?)<\\/paper-card>\\n<\\/div>', 'sg');
      if (cardsBlockRegex.test(cardsLayout)) {

      } else {
        cardsBlockRegex = new RegExp(
            'grid-gap: 32px">(.*?)<\\/paper-card><\\/div>', 'sg');
      }

      for (let cardBlock of cardsLayout.match(cardsBlockRegex)) {
        tokenizedHtml += '.cards{';
        const cardRegex = new RegExp('<paper-card .*?<\\/paper-card>', 'sg');
        for (let card of cardBlock.match(cardRegex)) {
          let tokenName = '';
          if (card.includes('paper-card heading')) {
            tokenName = '.standard-card';
          } else if (card.includes('paper-card image')) {
            tokenName = '.card-with-buttons{.button-disabled.button}';
          }
          tokenizedHtml += tokenName;
        }
        tokenizedHtml += '}';
      }

    }
  }
  tokenizedHtml += '.footer';
  const tokenFile = './data/' + templateId.replace('.html', '.tk');
  fs.writeFile(tokenFile, tokenizedHtml, (err) => {
    if (err) {
      console.log(err, tokenizedHtml, templateId);
    } else {
      console.log(templateId.replace('.html', '.tk'));
    }
  });
  // return;
}
