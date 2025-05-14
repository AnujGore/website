const books = [
    { cover: "assets/born_a_crime_cover.jpg", rating: 4},
    { cover: "assets/butter_cover.jpg", rating: 4},
    { cover: "assets/five_decembers.jpg", rating: 3},
    { cover: "assets/kafka_on_the_shore.jpg", rating: 3},
    { cover: "assets/mysterious_affair_at_styles.jpg", rating: 4},
    { cover: "assets/orbital.jpg", rating: 2},
    { cover: "assets/the_anxious_generation.jpg", rating: 3 },
    { cover: "assets/the_sellout.jpg", rating: 4 },
    { cover: "assets/you_are_here.jpg", rating: 3},
    { cover: "assets/so_much_blue.jpg", rating: 3 },
    { cover: "assets/a_man_with_one_of_those_faces.jpg", rating: 4},
    { cover: "assets/the_memory_police.jpg", rating: 2},
    { cover: "assets/death_on_the_nile.jpg", rating: 4 },
    { cover: "assets/the_white_tiger.jpg", rating: 3},
    { cover: "assets/the_windfall.jpg", rating: 4},
    { cover: "assets/the_ride_of_a_lifetime.jpg", rating: 4},
    { cover: "assets/the_satsuma_complex.jpg", rating: 4 },
    { cover: "assets/a_promised_land.jpg", rating: 4 },
    { cover: "assets/catcher_in_the_rye.jpg", rating: 3},
    { cover: "assets/animal-farm.jpg", rating: 4 },
    { cover: "assets/1984.jpg", rating: 4 },
    { cover: "assets/to_kill_a_mockingbird.jpg", rating: 3 },
    { cover: "assets/a_long_way_down.jpg", rating: 1},
    { cover: "assets/sapiens.jpg", rating: 4},
    { cover: "assets/hotel_avocado.jpg", rating: 3},
];


document.addEventListener('DOMContentLoaded', function() {
  const nav_buttons = document.querySelectorAll(".nav-button");
  const title = document.querySelector('h1');

  nav_buttons.forEach(button => {
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

  // Blog

  const blogContainer = document.getElementById("blogContainer");

  fetch("blog_posts.json")
    .then(response => response.json())
    .then(posts => {
      blogContainer.innerHTML = "";
  
      posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "max-w-3xl mx-auto mb-12 px-2";
  
        postElement.innerHTML = `
          <h3 class="text-2xl font-semibold text-center mb-4">${post.title}</h3>
          <p class="text-base leading-relaxed text-gray-800">${post.content}</p>
        `;
  
        blogContainer.appendChild(postElement);
      });
    })
    .catch(error => {
      blogContainer.innerHTML = "<p class='text-center text-red-600'>Error loading blog posts.</p>";
      console.error("Error fetching blog posts:", error);
    });
  


  //For books

  const bookGrid = document.getElementById("bookGrid");

  bookGrid = loadBookstoPage(books, bookGrid);

});

function loadBookstoPage(books, html_ID) {
    books.forEach((book) => {
        let div = document.createElement("div");
        div.classList.add("book");
        div.innerHTML = `
        <img src="${book.cover}" alt="${book.title}" class="w-40 h-60 object-cover mb-4" />
        <div class="w-40 text-center text-black-500 text-xl">${displayRating(book.rating)}</div>
      `;

        html_ID.appendChild(div);

    });

    return html_ID;
}

function displayRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0; // Check if there's a decimal part

    for (let i = 0; i < fullStars; i++) {
      stars += '&#9733;';
    }
  
    if (hasHalfStar) {
      stars += '&#11240;'; // Example: HTML entity for fraction one-half
    }
  
    return `<p>${stars}</p>`;
  }