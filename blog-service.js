const { Sequelize, DataTypes } = require('sequelize');

// Create Sequelize instance and connect to the database
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', // Replace with your database dialect (e.g., 'postgres', 'sqlite')
});

// Import the Post and Category models
const Post = require('./models/post');
const Category = require('./models/category');

// Define associations between models if needed (e.g., Post.belongsTo(Category))

// Helper function to format date in views
function formatDate(dateObj) {
  let year = dateObj.getFullYear();
  let month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  let day = dateObj.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to initialize the database and synchronize the models
function initialize() {
  return sequelize.sync()
    .then(() => {
      console.log('Database synchronized successfully');
    })
    .catch((error) => {
      console.error('Unable to synchronize the models:', error);
      throw error;
    });
}

// Function to get all posts
function getAllPosts() {
  return Post.findAll()
    .then((posts) => {
      return posts;
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
      throw error;
    });
}

// Function to get all categories
function getAllCategories() {
  return Category.findAll()
    .then((categories) => {
      return categories;
    })
    .catch((error) => {
      console.error('Error fetching categories:', error);
      throw error;
    });
}

// Function to add a new post
function addPost(postData) {
  postData.published = postData.published ? true : false;
  for (const key in postData) {
    if (postData.hasOwnProperty(key) && postData[key] === '') {
      postData[key] = null;
    }
  }
  postData.postDate = new Date();

  return Post.create(postData)
    .then(() => {
      console.log('Post added successfully');
    })
    .catch((error) => {
      console.error('Error adding post:', error);
      throw error;
    });
}

// Function to get posts by category
function getPostsByCategory(categoryId) {
  return Post.findAll({
    where: {
      category: categoryId,
    },
  })
    .then((posts) => {
      return posts;
    })
    .catch((error) => {
      console.error('Error fetching posts by category:', error);
      throw error;
    });
}

// Function to get posts by minimum date
function getPostsByMinDate(minDateStr) {
  const { gte } = Sequelize.Op;

  return Post.findAll({
    where: {
      postDate: {
        [gte]: new Date(minDateStr),
      },
    },
  })
    .then((posts) => {
      return posts;
    })
    .catch((error) => {
      console.error('Error fetching posts by minimum date:', error);
      throw error;
    });
}

// Function to get a post by ID
function getPostById(id) {
  return Post.findAll({
    where: {
      id: id,
    },
  })
    .then((post) => {
      return post[0];
    })
    .catch((error) => {
      console.error('Error fetching post by ID:', error);
      throw error;
    });
}

// Function to get published posts
function getPublishedPosts() {
  return Post.findAll({
    where: {
      published: true,
    },
  })
    .then((posts) => {
      return posts;
    })
    .catch((error) => {
      console.error('Error fetching published posts:', error);
      throw error;
    });
}

// Function to get published posts by category
function getPublishedPostsByCategory(categoryId) {
  return Post.findAll({
    where: {
      published: true,
      category: categoryId,
    },
  })
    .then((posts) => {
      return posts;
    })
    .catch((error) => {
      console.error('Error fetching published posts by category:', error);
      throw error;
    });
}

// Function to add a new category
function addCategory(categoryData) {
  for (const key in categoryData) {
    if (categoryData.hasOwnProperty(key) && categoryData[key] === '') {
      categoryData[key] = null;
    }
  }

  return Category.create(categoryData)
    .then(() => {
      console.log('Category added successfully');
    })
    .catch((error) => {
      console.error('Error adding category:', error);
      throw error;
    });
}

// Function to delete a post by ID
function deletePostById(id) {
  return Post.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      console.log('Post deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting post:', error);
      throw error;
    });
}

// Function to delete a category by ID
function deleteCategoryById(id) {
  return Category.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      console.log('Category deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting category:', error);
      throw error;
    });
}

// Export all the functions and Sequelize instance
module.exports = {
  initialize,
  getAllPosts,
  getAllCategories,
  addPost,
  getPostsByCategory,
  getPostsByMinDate,
  getPostById,
  getPublishedPosts,
  getPublishedPostsByCategory,
  addCategory,
  deletePostById,
  deleteCategoryById,
  formatDate,
  sequelize, // Export Sequelize instance for defining associations in server.js
};
