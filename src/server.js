const express = require('express');
const { faker } = require('@faker-js/faker');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  methods: 'GET',
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

function generateNewsList(count) {
  const newsList = [];
  for (let i = 0; i < count; i++) {
    const news = {
      id: faker.string.uuid(),
      subject: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      posted: Math.floor(faker.date.past().getTime() / 1000), 
    };
    newsList.push(news);
  }
  return newsList;
}

const newsList = generateNewsList(5);


setInterval(() => {
  const newNews = generateNewsList(1)[0]; 
  if (newsList.length >= 5) {
    newsList.shift(); 
  }
  newsList.push(newNews);
}, 5000);

app.get('/news', (req, res) => {
  
  setTimeout(() => {
    const response = {
      status: 'ok',
      timestamp: Math.floor(Date.now() / 1000), 
      newsList,
    };

    res.json(response);
  }, 5000);
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});