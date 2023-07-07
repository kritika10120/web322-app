/***************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: __Kritika Kritika_____ Student ID: __167103217_____ Date: 08-06-2023
*  Cyclic Web App URL: _________https://web322appassignment03.cyclic.app/___________
*
*  GitHub Repository URL: ______https://github.com/kritika10120/web322-app____________
*
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5500;

// Serve the categories.html file with categories data
app.get('/categories', (req, res) => {
  const categoriesPath = path.join(__dirname, 'data/categories.json');
  fs.readFile(categoriesPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const categories = JSON.parse(data);
      let categoriesHTML = '<h1>Categories</h1>';
      categories.forEach((category) => {
        categoriesHTML += `<p>${category}</p>`;
      });
      res.send(categoriesHTML);
    }
  });
});

// Serve the posts.html file with posts data
app.get('/posts', (req, res) => {
  const postsPath = path.join(__dirname, 'data/posts.json');
  fs.readFile(postsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const posts = JSON.parse(data);
      let postsHTML = '<h1>Posts</h1>';
      posts.forEach((post) => {
        postsHTML += `<p>${post}</p>`;
      });
      res.send(postsHTML);
    }
  });
});

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
