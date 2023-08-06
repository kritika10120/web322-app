/*********************************************************************************
*  WEB322 – Assignment 05
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Kritika Kritika Student ID: 167103217 Date: 07-20-2023
*
*  Cyclic Web App URL: https://crabby-kit-elk.cyclic.app/
*
*  GitHub Repository URL: https://github.com/kritika10120/web322-app
********************************************************************************/
const express = require('express');
const session = require('express-session');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');

// Import auth-service.js
const authData = require('./auth-service');

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up express-session
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

const blogService = require('./blog-service');

function getPostsData() {
  const posts = blogService.getPosts();
  const categories = blogService.getCategories();

  const postsData = posts.map(post => {
    const selectedCategory = categories.find(category => category.id === post.category);
    return {
      ...post,
      categories,
      selectedCategory,
    };
  });

  return { postsData };
}

// Middleware to ensure user is logged in
function ensureLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/', (req, res) => {
  res.redirect('/blog');
});

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About' });
});

app.get('/blog', (req, res) => {
  const { postsData } = getPostsData();
  res.render('blog', { pageTitle: 'Blog', postsData, user: req.session.user });
});

app.get('/login', (req, res) => {
  res.render('login', { pageTitle: 'Login' });
});

app.post('/login', (req, res) => {
  req.body.userAgent = req.get('User-Agent');

  authData.CheckUser(req.body)
    .then(user => {
      req.session.user = {
        userName: user.userName,
        email: user.email,
        loginHistory: user.loginHistory
      };
      res.redirect('/posts');
    })
    .catch(err => {
      res.render('login', { errorMessage: err, userName: req.body.userName });
    });
});

app.get('/register', (req, res) => {
  res.render('register', { pageTitle: 'Register' });
});

app.post('/register', (req, res) => {
  authData.RegisterUser(req.body)
    .then(() => {
      res.redirect('/posts');
    })
    .catch(err => {
      res.render('register', { errorMessage: err, userName: req.body.userName });
    });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/userHistory', ensureLogin, (req, res) => {
  res.render('userHistory', { pageTitle: 'User History', user: req.session.user });
});

app.get('/posts', ensureLogin, (req, res) => {
  const { postsData } = getPostsData();
  res.render('posts', { pageTitle: 'Posts', postsData });
});

app.get('/categories', ensureLogin, (req, res) => {
  const categories = blogService.getCategories();
  res.render('categories', { pageTitle: 'Categories', categories });
});

app.delete('/categories/:id', ensureLogin, (req, res) => {
  const categoryId = parseInt(req.params.id);
  blogService.removeCategory(categoryId);
  res.redirect('/categories');
});
app.get('/add-post', ensureLogin, (req, res) => {
  const categories = blogService.getCategories();
  res.render('addPost', { pageTitle: 'Add Post', categories });
});

app.post('/add-post', ensureLogin, (req, res) => {
  const { title, content, category } = req.body;
  const post = {
    title,
    content,
    category: parseInt(category)
  };

  blogService.addPost(post);

  res.redirect('/posts');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

