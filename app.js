document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll(".nav-button");
  const title = document.querySelector('h1'); // Assuming your title is an <h1> tag


  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const page = this.getAttribute('data-page'); // Get the data-page attribute value
      if (page) {
        window.location.href = `${page}.html`; // Construct the URL
      } else {
        console.error("Button missing data-page attribute");
      }
    });
  });



  if (title) {
    title.addEventListener('click', function() {
      window.location.href = './index.html'; // Navigate back to index.html
    });
  }
});