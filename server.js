/***************************
*  WEB322 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: __Kritika Kritika_____ Student ID: __167103217_____ Date: 07-07-2023
*  Cyclic Web App URL: 
*
*  GitHub Repository URL: 
*


/***************************
*  WEB322 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: __Kritika Kritika_____ Student ID: __167103217_____ Date: 08-06-2023
*  Cyclic Web App URL: _________https://web322appassignment03.cyclic.app/___________
*
*  GitHub Repository URL: ______https://github.com/kritika10120/web322-app____________
*
****************************/

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

// Serve the about.html file
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Serve the categories.json file
app.get('/categories', (req, res) => {
  const categoriesPath = path.join(__dirname, 'data/categories.json');
  fs.readFile(categoriesPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const categories = JSON.parse(data);
      res.json(categories);
    }
  });
});

// Serve the posts.json file
app.get('/posts', (req, res) => {
  const postsPath = path.join(__dirname, 'data/posts.json');
  fs.readFile(postsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const posts = JSON.parse(data);
      const formattedPosts = posts.map(post => {
        return {
          'Post ID': post.id,
          'Title': post.title,
          'Post Date': post.date,
          'Category': post.category,
          'Published': post.published
        };
      });
      res.send('<pre>' + JSON.stringify(formattedPosts, null, 2) + '</pre>');
    }
  });
});

// Serve the addPost.html file
app.get('/posts/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/addPost.html'));
});

// Serve the about.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
