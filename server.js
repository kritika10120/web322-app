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
  secret: 'Rn9GfSesvWPMcYldzugpto8iw4XC2mNH',
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

// ... (other routes for adding, editing, and viewing posts, etc.)
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
