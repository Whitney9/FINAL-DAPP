document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.getElementById("searchBox");
  const cards = document.querySelectorAll(".card");

  searchBox.addEventListener("input", function () {
    const value = searchBox.value.toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector("h2").innerText.toLowerCase();
      const description = card.querySelector("p").innerText.toLowerCase();

      if (title.includes(value) || description.includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

new Swiper('.card-wrapper', {
    loop: true,

    // If we need pagination
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
    },

    // Navigation arrows
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
});