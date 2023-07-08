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
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up static file serving
app.use(express.static('public'));

// Define a route for the about.html page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Define a route for the blog.html page
app.get('/blog', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'posts.json'), 'utf8', (err, postsData) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, categoriesData) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      const templatePath = path.join(__dirname, 'views', 'blog.hbs');
      fs.readFile(templatePath, 'utf8', (err, templateContent) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
          return;
        }

        // Render the blog template with the posts and categories data
        const renderedTemplate = renderBlogTemplate(templateContent, JSON.parse(postsData), JSON.parse(categoriesData));
        res.send(renderedTemplate);
      });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Helper function to render the blog template
function renderBlogTemplate(template, postsData, categoriesData) {
  // Your rendering logic goes here
  // You can use a templating engine like Handlebars or EJS to render the template
  // For simplicity, I'll provide a basic example using string interpolation

  let renderedTemplate = template;

  // Replace the post and categories placeholders in the template
  renderedTemplate = renderedTemplate.replace('{{posts}}', renderPosts(postsData));
  renderedTemplate = renderedTemplate.replace('{{categories}}', renderCategories(categoriesData));

  return renderedTemplate;
}

// Helper function to render the posts table
function renderPosts(postsData) {
  // Your rendering logic for the posts table goes here
  // You can use HTML and string manipulation to generate the table
  // For simplicity, I'll provide a basic example using string interpolation

  let postsTable = '<table>';

  // Iterate over the posts data and generate table rows
  postsData.forEach((post) => {
    const row = `<tr><td>${post.title}</td><td>${post.date}</td></tr>`;
    postsTable += row;
  });

  postsTable += '</table>';

  return postsTable;
}

// Helper function to render the categories table
function renderCategories(categoriesData) {
  // Your rendering logic for the categories table goes here
  // You can use HTML and string manipulation to generate the table
  // For simplicity, I'll provide a basic example using string interpolation

  let categoriesTable = '<table>';

  // Iterate over the categories data and generate table rows
  categoriesData.forEach((category) => {
    const row = `<tr><td>${category.name}</td><td>${category.description}</td></tr>`;
    categoriesTable += row;
  });

  categoriesTable += '</table>';

  return categoriesTable;
}




