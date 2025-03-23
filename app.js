const books = [
    { title: "Born a Crime", cover: "assets/born_a_crime_cover.jpg"},
    { title: "Butter", cover: "assets/butter_cover.jpg"},
    { title: "Five Decembers", cover: "assets/five_decembers.jpg"},
    { title: "Kafka on the Shore", cover: "assets/kafka_on_the_shore.jpg"},
    { title: "Mysterious Affair at Styles", cover: "assets/mysterious_affair_at_styles.jpg"}
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


  //For books

  const bookGrid = document.getElementById("bookGrid");

  bookGrid = loadBookstoPage(books, bookGrid);

});

function loadBookstoPage(books, html_ID) {
    books.forEach((book) => {
        let div = document.createElement("div");
        div.classList.add("book");
        div.innerHTML = `<img src="${book.cover}" alt="${book.title}" />`;
        html_ID.appendChild(div);
        
    });

    return html_ID;
}