const fs = require('fs');

let posts = [];
let categories = [];

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/posts.json', 'utf8', (err, data) => {
      if (err) {
        reject('Unable to read file');
        return;
      }

      posts = JSON.parse(data);

      fs.readFile('./data/categories.json', 'utf8', (err, data) => {
        if (err) {
          reject('Unable to read file');
          return;
        }

        categories = JSON.parse(data);
        resolve();
      });
    });
  });
}

function getAllPosts() {
  return new Promise((resolve, reject) => {
    if (posts.length === 0) {
      reject('No results returned');
      return;
    }

    resolve(posts);
  });
}

function getPublishedPosts() {
  return new Promise((resolve, reject) => {
    const publishedPosts = posts.filter((post) => post.published === true);

    if (publishedPosts.length === 0) {
      reject('No results returned');
      return;
    }

    resolve(publishedPosts);
  });
}

function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length === 0) {
      reject('No results returned');
      return;
    }

    resolve(categories);
  });
}

module.exports = {
  initialize,
  getAllPosts,
  getPublishedPosts,
  getCategories,
};
