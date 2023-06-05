const express = require('express');
const app = express();
const blogService = require('./blog-service');

// Routes
app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

app.use(express.static('public'));

app.get('/blog', (req, res) => {
  blogService.getPublishedPosts()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.get('/posts', (req, res) => {
  blogService.getAllPosts()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.get('/categories', (req, res) => {
  blogService.getCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Express http server listening on port ${PORT}`);
});
