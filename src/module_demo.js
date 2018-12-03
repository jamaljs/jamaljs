const _ = require('./index');

_.initialize();

const el = document.querySelector('#package-style-importing-demo');
const app = new _.create(el, _.div('I\'m importing jml as a module and using j functions from in it. So eslint can\'t catch me this time 🚗'));

app.render();