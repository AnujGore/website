document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll(".nav-button");
  const title = document.querySelector('h1');

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          const page = this.getAttribute('data-page');
          if (page) {
              window.location.href = `website/${page}.html`;
          } else {
              console.error("Button missing data-page attribute");
          }
      });
  });

  if (title) {
      title.addEventListener('click', function() {
          window.location.href = './index.html';
      });
  }

  const blogPosts = loadDirectoryContents("/blog_posts/");
  const blogContainer = document.getElementById("blogContainer");

//   blogPosts.forEach((post) => {
//     blogContainer = loadBlogPoststoPage(blogContainer, post);
//   })
  
  // Make this part an async function

  const books = [
      { title: "Born a Crime", cover: "assets/born_a_crime_cover.jpg"},
      { title: "Butter", cover: "assets/butter_cover.jpg"},
      { title: "Five Decembers", cover: "assets/five_decembers.jpg"},
      { title: "Kafka on the Shore", cover: "assets/kafka_on_the_shore.jpg"},
      { title: "Mysterious Affair at Styles", cover: "assets/mysterious_affair_at_styles.jpg"}
  ];

  const bookGrid = document.getElementById("bookGrid");

  bookGrid = loadBookstoPage(books, bookGrid);

});

async function loadBookstoPage(books, html_ID) {
    books.forEach((book) => {
        let div = document.createElement("div");
        div.classList.add("book");
        div.innerHTML = `<img src="${book.cover}" alt="${book.title}" />`;
        html_ID.appendChild(div);
        return html_ID;
    });
}

async function loadDirectoryContents(directory) {
    try {
        const files = await fs.readdir(directory);
        const fileContents = {};
        
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stats = await fs.stat(filePath);
            
            if (stats.isFile() && path.extname(file) === '.txt') {
                const content = await fs.readFile(filePath, 'utf-8');
                fileContents[file] = content;
            }
        }
        
        return fileContents;
    } catch (error) {
        console.error("Error reading directory:", error);
        return null;
    }
}

async function loadBlogPoststoPage(html_ID, content) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `<h2>${file.name.replace(".txt", "")}</h2><p>${content}</p>`;
    html_ID.appendChild(postElement);

    return html_ID;
}