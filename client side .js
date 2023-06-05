// Execute code after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve data from categories.json
    fetch("/data/categories.json")
      .then(response => response.json())
      .then(categories => {
        // Display the categories in the sidebar
        const sidebar = document.querySelector(".sidebar");
        categories.forEach(category => {
          const listItem = document.createElement("li");
          listItem.textContent = category;
          sidebar.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  
    // Retrieve data from posts.json
    fetch("/data/posts.json")
      .then(response => response.json())
      .then(posts => {
        // Display the published posts in the main content area
        const mainContent = document.querySelector(".main-content");
        const publishedPosts = posts.filter(post => post.published);
        publishedPosts.forEach(post => {
          const article = document.createElement("article");
          const title = document.createElement("h2");
          const category = document.createElement("p");
  
          title.textContent = post.title;
          category.textContent = post.category;
  
          article.appendChild(title);
          article.appendChild(category);
          mainContent.appendChild(article);
        });
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  });
  