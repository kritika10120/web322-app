/*********************************************************************************
*  WEB322 – Assignment 05
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Kritika Kritika Student ID: 167103217 Date: 07-20-2023
*
*  Cyclic Web App URL: https://shy-erin-bear-gown.cyclic.app/
*
*  GitHub Repository URL: https://github.com/kritika10120/web322-app
********************************************************************************/

const express = require('express');
const app = express();
const port = 8080;

app.set('view engine', 'hbs');
app.use(express.static('public'));

const blogService = require('./blog-service');

function getPostsData() {
  const posts = blogService.getPosts();
  const categories = blogService.getCategories();

  // include a "selected" property for each post
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

app.get('/', (req, res) => {
  res.render('about', { pageTitle: 'About' });
});

app.get('/addPost', (req, res) => {
  res.render('addPost', { pageTitle: 'Add Post' });
});

app.post('/addPost', (req, res) => {
  // Code to handle adding a new post
  res.redirect('/posts');
});

app.get('/posts', (req, res) => {
  const { postsData } = getPostsData();
  res.render('posts', { pageTitle: 'Posts', postsData, categories: blogService.getCategories() });
});

app.get('/categories', (req, res) => {
  const categories = blogService.getCategories();
  res.render('categories', { pageTitle: 'Categories', categories });
});

// Handle DELETE request to remove a category
app.delete('/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  blogService.removeCategory(categoryId);
  res.redirect('/categories');
});

// Adding middleware to handle the "_method" field in the form for overriding the HTTP method
app.use(express.urlencoded({ extended: true }));

// Handle POST request with "_method" field to override the HTTP method
app.post('*', (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    next();
  } else {
    next();
  }
});

app.get('/posts/add', (req, res) => {
  res.render('addPost', { pageTitle: 'Add Post' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
