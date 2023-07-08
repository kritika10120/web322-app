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

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Serve static files from the "public" folder
app.use(express.static('public'));

// Define the route for the "Blog" link
app.get('/blog', (req, res) => {
  // Read the contents of blog.hbs file
  fs.readFile(path.join(__dirname, 'views', 'blog.hbs'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    // Read the post data from posts.json
    fs.readFile(path.join(__dirname, 'data', 'posts.json'), 'utf8', (err, postData) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      // Read the category data from categories.json
      fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, categoryData) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        // Render the blog template with the retrieved data
        const template = Handlebars.compile(data);
        const posts = JSON.parse(postData);
        const categories = JSON.parse(categoryData);
        const renderedTemplate = template({ posts, categories });
        res.send(renderedTemplate);
      });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});





