/***************************
*  WEB322 – Assignment 05
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Kritika Kritika Student ID: 167103217 Date: 07-20-2023
*  Cyclic Web App URL: https://shy-erin-bear-gown.cyclic.app/
*
*  GitHub Repository URL: https://github.com/kritika10120/web322-app
****************************/

const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Require the blog-service module
const blogService = require('./blog-service');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Enable express.urlencoded() middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Add routes for displaying categories, posts, and adding posts
app.get('/categories', blogService.getAllCategories);
app.get('/posts', blogService.getAllPosts);
app.get('/posts/add', blogService.getAddPostForm);
app.post('/posts/add', blogService.addPost);

// Add routes for deleting categories and posts
app.get('/categories/delete/:id', blogService.deleteCategory);
app.get('/posts/delete/:id', blogService.deletePost);

// Redirect any other routes to the about page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
