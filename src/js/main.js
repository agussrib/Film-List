import '../scss/styles.scss';
import {Carousel, Button, Dropdown} from 'bootstrap';
import $, { error, get } from "jquery";

const apiKey = `ce530a4c86f98684c2c0e9909810a1bd`;
const defaultURL = `https://api.themoviedb.org/3`;
const trendingURL = `${defaultURL}/trending/all/week?api_key=${apiKey}`;
const popularURL = `${defaultURL}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
const tvShowURL = `${defaultURL}/discover/tv?api_key=${apiKey}&with_network=213`;
const imageURL = `https://image.tmdb.org/t/p/w200`;

const trendingContainer = $("div#trending-card-container");
const popularContainer = $("div#popular-card-container");
const tvShowContainer = $("div#tvshow-card-container");

const getMovies = (movieURL, containerCard) => {
  $.ajax({
    url: movieURL,
    method: "GET",
    success: (data) => {
      $(containerCard).empty();
      const movies = data.results || [];
      const cards = movies.map((movie) => {
        const { title, name, poster_path } = movie;
        const posterImageUrl = `${imageURL}${poster_path}`;
        const movieTitle = title || name;
        return `
          <div class="movie-item mx-2">
            <img src="${posterImageUrl}" alt="${movieTitle}">
            <div class="title-movie">
              <h5>${movieTitle}</h5>
            </div>
          </div>`;
      }).join('');
      $(containerCard).html(cards);
    },
    error: (error) => {
      alert(error);
    }
  });
};

$(document).ready(() => {
  getMovies(trendingURL, trendingContainer);
  getMovies(popularURL, popularContainer);
  getMovies(tvShowURL, tvShowContainer);
});

$(".search-form").on("keyup",() => {
  const searchValue = $(this).val().toLowerCase();
  $(".movie-item").each(function () {
    const movieTitle = $(this).find(".title-movie").text().toLowerCase();
    $(this).toggle(movieTitle.includes(searchValue) || !searchValue);
  });
});

class FooterElement extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div class="container">
      <footer class="py-3 my-4">
        <p class="text-center text-body-secondary"><i class="bi bi-infinity"></i>Dicoding : Agus Sri Budoyo</p>
      </footer>
    </div>`;
  }
}

customElements.define("footer-element", FooterElement);