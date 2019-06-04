let sample = `.header.style.form{.datepicker.input.password-input.radio-button.radio-button.radio-button.button-disabled.button-disabled.progress}.cards{.standard-card.standard-card.standard-card.card-with-buttons{.button-disabled.button}.card-with-buttons{.button-disabled.button}.standard-card.standard-card.card-with-buttons{.button-disabled.button}.card-with-buttons{.button-disabled.button}.card-with-buttons{.button-disabled.button}}.cards{.standard-card.card-with-buttons{.button-disabled.button}.standard-card.card-with-buttons{.button-disabled.button}}.cards{.standard-card.standard-card.card-with-buttons{.button-disabled.button}.standard-card.card-with-buttons{.button-disabled.button}.card-with-buttons{.button-disabled.button}.card-with-buttons{.button-disabled.button}.standard-card}.cards{.card-with-buttons{.button-disabled.button}.standard-card.standard-card.card-with-buttons{.button-disabled.button}.card-with-buttons{.button-disabled.button}.standard-card}.cards{.card-with-buttons{.button-disabled.button}.standard-card.standard-card.standard-card.card-with-buttons{.button-disabled.button}.standard-card.card-with-buttons{.button-disabled.button}.card-with-buttons{.button-disabled.button}}.cards{.standard-card.standard-card.card-with-buttons{.button-disabled.button}.card-with-buttons{.button-disabled.button}.card-with-buttons{.button-disabled.button}.standard-card.standard-card.card-with-buttons{.button-disabled.button}.card-with-buttons{.button-disabled.button}.standard-card.standard-card.card-with-buttons{.button-disabled.button}}.footer`;
sample = `.header.style.form{.input.input.input.checkbox.radio-button.input.input.datepicker.password-input.radio-button.button-disabled.button.progress}.cards{.card-with-buttons{.button-disabled.button}.card-with-buttons{.button-disabled.button}.standard-card.standard-card.standard-card.card-with-buttons{.button-disabled.button}}.footer`;
const tokens = require('./tokens.json');
sample = sample.replace('.header.style', '').replace('.footer', '');
const fs = require('fs');
const faker = require('faker');
const regex = /.(.*?){(.*?)}/sg;

let outputHtml = tokens.header + tokens.style;
sample = sample.replace(/\.card-with-buttons{\.button-disabled\.button}/g,
    '.card-and-buttons');

while ((m = regex.exec(sample)) !== null) {
  if (m.index === regex.lastIndex) {
    regex.lastIndex++;
  }
  let container = m[1];
  let containerElements = m[2];
  if (!tokens[container]) continue;
  let elementsHtml = containerElements.split('.').
      map(item => {
        console.log(item);
        if (item === 'card-and-buttons') {
          return tokens['card-with-buttons'].replace('[image]',
              `https://dummyimage.com/350x150/99afe2/fdf3a4`).
              replace('[header]', faker.company.companyName()).
              replace('[heading]', faker.company.companyName()).
              replace('[distance]', faker.random.number()).
              replace('[address]', faker.address.streetAddress()).
              replace('[description]', faker.lorem.paragraph()).
              replace('{}',
                  tokens['button-disabled'].replace('[]', faker.random.word()) +
                  tokens.button.replace('[]', faker.random.word()));

        }
        return item ? tokens[item] : '\n';
      }).
      join('\n');

  let containerHtml = tokens[container].replace('{}', elementsHtml);
  // console.log(tokens[container],'\n','\n','---------------',elementsHtml,'##############\n\n',containerHtml)

  outputHtml += containerHtml.replace(/\[image\]/g,
      `https://dummyimage.com/350x150/99afe2/fdf3a4`).
      replace(/\[header\]/g, faker.company.companyName()).
      replace(/\[heading\]/g, faker.company.companyName()).
      replace(/\[distance\]/g, faker.random.number()).
      replace(/\[address\]/g, faker.address.streetAddress()).
      replace(/\[description\]/g, faker.lorem.paragraph()).
      replace(/\[heading\]/g, faker.random.word()).
      replace(/\[\]/g, faker.random.word()).
      replace(/\[content\]/g, faker.lorem.paragraph());
  ;
}
outputHtml += tokens.footer;

fs.writeFileSync('./sample.html', outputHtml);