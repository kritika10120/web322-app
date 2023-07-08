/***************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: __Kritika Kritika_____ Student ID: __167103217_____ Date: 08-06-2023
*  Cyclic Web App URL: _________https://web322appassignment03.cyclic.app
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
      const tableRows = categories.map(category => {
        return `<tr>
          <td>${category.id}</td>
          <td>${category.name}</td>
        </tr>`;
      });
      const table = `<table>
        <tr>
          <th>Category ID</th>
          <th>Category Name</th>
        </tr>
        ${tableRows.join('')}
      </table>`;
      res.send(table);
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
      const tableRows = posts.map(post => {
        return `<tr>
          <td>${post.id}</td>
          <td>${post.title}</td>
          <td>${post.date}</td>
          <td>${post.category}</td>
          <td>${post.published}</td>
        </tr>`;
      });
      const table = `<table>
        <tr>
          <th>Post ID</th>
          <th>Title</th>
          <th>Post Date</th>
          <th>Category</th>
          <th>Published</th>
        </tr>
        ${tableRows.join('')}
      </table>`;
      res.send(table);
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
