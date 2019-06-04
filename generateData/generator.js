const tokens = require('./tokens.json');
const faker = require('faker');
const fs = require('fs');
for (let fileId = 1; fileId < 20; fileId++) {
  let forms = [];
  for (let i = 0; i < 2; i++) {
    let form = [];
    // form.push(tokens.combobox.replace('[]', faker.random.word));
    form.push(tokens['input'].replace('[]', faker.random.word));
    form.push(tokens['input'].replace('[]', faker.random.word));
    form.push(tokens['input'].replace('[]', faker.random.word));
    form.push(tokens['input'].replace('[]', faker.random.word));
    form.push(tokens.checkbox.replace('[]', faker.random.word));
    form.push(tokens.checkbox.replace('[]', faker.random.word));
    form.push(tokens.checkbox.replace('[]', faker.random.word));
    form.push(tokens.checkbox.replace('[]', faker.random.word));
    form.push(tokens['input'].replace('[]', faker.random.word));
    form.push(tokens['datepicker'].replace('[]', faker.random.word));
    form.push(tokens['password-input'].replace('[]', faker.random.word));
    form.push(tokens['radio-button'].replace('[]', faker.random.word));
    form.push(tokens['radio-button'].replace('[]', faker.random.word));
    form.push(tokens['radio-button'].replace('[]', faker.random.word));
    // form.push(tokens['file-upload']);
    form = faker.helpers.shuffle(form);

    form.push(tokens['button-disabled'].replace('[]', faker.random.word));
    form.push(tokens['button'].replace('[]', faker.hacker.verb));
    form.push(tokens['progress'].replace('[]', Math.random()));

    forms.push('<div class="from">' + '<h1>Form layout ' + (i + 1) + '</h1> ' +
        tokens.form.replace('[]', form.join('\n')) + '</div>');
  }

  let formsData = faker.helpers.shuffle(forms).join('\n');
  let cards = [];
  for (let i = 0; i < 10; i++) {
    let card = `<paper-card heading="${faker.internet.userName()}" image="http://placehold.it/350x150/FFC107/000000" alt="${faker.internet.userName()}">
      <div class="card-content">${faker.lorem.paragraph()}</div>
      <div class="card-actions">
        <vaadin-button>Skip</vaadin-button>
        <vaadin-button primary>Done!</vaadin-button>
      </div>
    </paper-card>`;

    cards.push(card);
    cards.push(`<paper-card heading="${faker.random.word()}" 
              alt="${faker.random.word()}">
      <div class="card-content">${faker.lorem.paragraph()}</div>
    </paper-card>`);

    cards.push(`<paper-card image="${faker.image.food()}" alt="Donuts">
    <div class="card-content">
      <div class="cafe-header">${faker.company.companyName()}
        <div class="cafe-location cafe-light">
          <iron-icon icon="communication:location-on"></iron-icon>
          <span>${faker.random.number()}ft</span>
        </div>
      </div>
      <div class="cafe-rating">
        <iron-icon class="star" icon="star"></iron-icon>
        <iron-icon class="star" icon="star"></iron-icon>
        <iron-icon class="star" icon="star"></iron-icon>
        <iron-icon class="star" icon="star"></iron-icon>
        <iron-icon class="star" icon="star"></iron-icon>
      </div>
      <p>${faker.address.streetAddress()}</p>
      <p class="cafe-light">${faker.lorem.paragraph()}</p>
    </div>
    <div class="card-actions">
      <p>Tonight's availability</p>
      <div class="horizontal justified">
        <vaadin-button>7:30PM</vaadin-button>
        <vaadin-button>8:10PM</vaadin-button>
      </div>
    </div>
  </paper-card>`);
  }
  cards = faker.helpers.shuffle(cards);

  cards = `<h1>Cards</h1><div style="padding:16px;display: grid;grid-template-columns:repeat(auto-fill, 275px);justify-content: space-around;grid-gap: 32px">${cards.join(
      '\n')}</div>`;

  fs.writeFileSync(`./data/input-${fileId.toString().padStart(5, '0')}.html`,
      tokens.header + formsData + cards + tokens.footer,
      (err) => {

      });
}