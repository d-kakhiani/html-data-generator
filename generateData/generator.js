const tokens = require('./tokens.json');
const faker = require('faker');
const fs = require('fs');
for (let fileId = 1; fileId < 200; fileId++) {
    let forms = [];
    for (let i = 0; i < 1; i++) {
        let form = [];
        for (let a = 0; a < faker.random.number({min: 1, max: 10}); a++) {
            form.push(tokens['input'].replace('[]', faker.random.word));
        }
        for (let a = 0; a < faker.random.number({min: 1, max: 5}); a++) {
            form.push(tokens.checkbox.replace('[]', faker.random.word));
        }
        form.push(tokens['datepicker'].replace('[]', faker.random.word));
        form.push(tokens['password-input'].replace('[]', faker.random.word));
        for (let a = 0; a < faker.random.number({min: 1, max: 5}); a++) {
            form.push(tokens['radio-button'].replace('[]', faker.random.word));
        }
        form = faker.helpers.shuffle(form);
        form.push(tokens['button-disabled'].replace('[]', faker.random.word));
        form.push(tokens['button'].replace('[]', faker.hacker.verb));
        form.push(tokens['progress'].replace('[]', Math.random()));

        forms.push('<div class="form">' + '<h1>Form layout ' + (i + 1) + '</h1> ' +
            tokens.form.replace('[]', form.join('\n')) + '</div>');
    }

    let cardsLayout = '';
    let formsData = faker.helpers.shuffle(forms).join('\n');

    for (let ii = 0; ii < faker.random.number({min: 1, max: 12}); ii++) {

        let cards = [];
        for (let i = 0; i < faker.random.number({min: 1, max: 12}); i++) {
            cards.push(tokens['standard-card'].replace('[heading]', faker.random.word()).replace('[content]', faker.lorem.paragraph()));

            cards.push(tokens["card-with-buttons"]
                .replace('[image]', `https://dummyimage.com/350x150/99afe2/fdf3a4`)
                .replace('[header]', faker.company.companyName())
                .replace('[heading]', faker.company.companyName())
                .replace('[distance]', faker.random.number())
                .replace('[address]', faker.address.streetAddress())
                .replace('[description]', faker.lorem.paragraph())
                .replace('{buttons}', tokens["button-disabled"].replace('[]', faker.random.word()) + tokens.button.replace('[]', faker.random.word()))
            );
        }
        cards = faker.helpers.shuffle(cards);

        cards = `<h1>Cards</h1><div style="padding:16px;display: grid;grid-template-columns:repeat(auto-fill, 325px);justify-content: space-around;grid-gap: 32px">${cards.join('\n')}</div>`;
        cardsLayout += cards;
    }
    fs.writeFileSync(`./data/input-${fileId.toString().padStart(5, '0')}.html`,
        tokens.header + tokens.style + formsData + cardsLayout + tokens.footer,
        (err) => {

        });
}