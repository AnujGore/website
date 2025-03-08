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
          window.location.href = '../index.html';
      });
  }

  const books = [
      { title: "Born a Crime", cover: "assets/born_a_crime_cover.jpg", reviewFile: "review1.txt" },
      { title: "Butter", cover: "assets/butter_cover.jpg", reviewFile: "review2.txt" },
      { title: "Five Decembers", cover: "assets/five_decembers.jpg", reviewFile: "review3.txt" },
      { title: "Kafka on the Shore", cover: "assets/kafka_on_the_shore.jpg", reviewFile: "review1.txt" },
      { title: "Mysterious Affair at Styles", cover: "assets/mysterious_affair_at_styles.jpg", reviewFile: "review3.txt" }
  ];

  const bookGrid = document.getElementById("bookGrid");
  const overlay = document.getElementById("overlay");
  const detailCover = document.getElementById("detailCover");
  const detailTitle = document.getElementById("detailTitle");
  const detailReview = document.getElementById("detailReview");
  const detailRating = document.getElementById("detailRating");

  function loadBooks() {
      books.forEach((book) => {
          let div = document.createElement("div");
          div.classList.add("book");
          div.innerHTML = `<img src="${book.cover}" alt="${book.title}" />`;
          // div.addEventListener('click', () => showBookDetails(book));
          bookGrid.appendChild(div);
      });
  }

  function showBookDetails(book) {
      detailCover.src = book.cover;
      detailTitle.textContent = book.title;
      fetch(book.reviewFile)
          .then(response => response.text())
          .then(text => {
              let [review, rating] = text.split("\n");
              detailReview.textContent = review;
              detailRating.textContent = `Rating: ${rating}`;
              overlay.style.display = "flex";
          });
  }

  function closeOverlay() {
      overlay.style.display = "none";
      window.location.href = `/book_reviews.html`
  }

  // Close overlay on outside click
  document.addEventListener('click', function(event) {
      if (overlay.contains(event.target)) {
          closeOverlay();
      }
  });

  // Prevent clicks inside the overlay from closing it.
  overlay.addEventListener('click', function(e) {
      e.stopPropagation();
  });

  loadBooks();

  fetchLatestPost()
        .then(text => {
            const lines = text.split('\n');
            if (lines.length > 0) {
                const title = lines[0];
                const content = lines.slice(1).join('\n');

                document.getElementById('post-title').textContent = title;
                document.getElementById('post-content').innerHTML = content.replace(/\n/g, '<br>');
            } else {
                document.getElementById('post-content').textContent = 'Error: Post content not found.';
            }
        })
        .catch(error => {
            console.error('Error fetching latest post:', error);
            document.getElementById('post-content').textContent = 'Error loading post.';
        });
});

async function fetchLatestPost() {
    try {
        const response = await fetch('./blog_posts/'); // Fetch the blog_posts directory
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const links = Array.from(doc.querySelectorAll('a'));
        const txtFiles = links
            .map(link => link.href)
            .filter(href => href.endsWith('.txt'))
            .map(href => href.substring(href.lastIndexOf('/') + 1)); // Extract filename

        if (txtFiles.length === 0) {
            throw new Error('No .txt files found in blog_posts.');
        }

        // Simple alphabetical sort, assuming later files are alphabetically later
        txtFiles.sort();
        const latestFile = 'blog_posts/' + txtFiles[txtFiles.length - 1]; // Prepend directory

        const postResponse = await fetch(latestFile);
        return postResponse.text();

    } catch (error) {
        throw error;
    }
}