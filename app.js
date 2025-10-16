const API_KEY = '283a964cdaf72b10272eb489c02a0f0e';
const resultsDiv = document.getElementById('results');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalPoster = document.getElementById('modalPoster');
const modalTitle = document.getElementById('modalTitle');
const modalInfo = document.getElementById('modalInfo');
const modalPlot = document.getElementById('modalPlot');
const favBtn = document.getElementById('favBtn');

let selectedMovie = null;

async function fetchMovies(query) {
  resultsDiv.innerHTML = '<p class="text-gray-400">Loading...</p>';
  
  const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    resultsDiv.innerHTML = `<p class="text-red-400">No results found.</p>`;
    return;
  }

  resultsDiv.innerHTML = data.results.map(item => {
    const poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image';
    const title = item.title || item.name || 'Untitled';
    const year = (item.release_date || item.first_air_date || '').split('-')[0] || 'N/A';
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';

    return `
      <div class="bg-gray-800 rounded-xl shadow-md hover:scale-105 transition p-3">
        <img src="${poster}" class="rounded-lg mb-3 w-full h-72 object-cover">
        <h3 class="text-lg font-semibold">${title}</h3>
        <p class="text-gray-400 text-sm">${year} | ⭐ ${rating}</p>
        <button onclick="showDetails(${item.id}, '${item.media_type}')" class="mt-3 bg-yellow-400 text-gray-900 w-full py-1 rounded-lg font-semibold hover:bg-yellow-300">View Details</button>
      </div>
    `;
  }).join('');
}

async function showDetails(id, type) {
  const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`);
  const movie = await res.json();
  selectedMovie = { ...movie, media_type: type };

  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/400x600?text=No+Image';
  modalPoster.src = poster;

  const title = movie.title || movie.name || 'Untitled';
  modalTitle.textContent = `${title} (${(movie.release_date || movie.first_air_date || '').split('-')[0] || 'N/A'})`;

  const genres = movie.genres ? movie.genres.map(g => g.name).join(', ') : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  modalInfo.textContent = `${genres} | ⭐ ${rating}`;

  modalPlot.textContent = movie.overview || 'No description available.';
  favBtn.textContent = '❤️ Add to Favorites';

  modal.classList.remove('hidden');
}

favBtn.addEventListener('click', () => {
  if (!selectedMovie) return;
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.find(m => m.id === selectedMovie.id && m.media_type === selectedMovie.media_type)) {
    favorites.push(selectedMovie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    favBtn.textContent = '✅ Added to Favorites';
  } else {
    favBtn.textContent = '❤️ Already in Favorites';
  }
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) fetchMovies(query);
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchMovies(searchInput.value.trim());
  }
});

window.addEventListener('load', async () => {
  const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`);
  const data = await res.json();
  if (data.results) {
    resultsDiv.innerHTML = data.results.slice(0, 12).map(item => {
      const poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image';
      const title = item.title || item.name || 'Untitled';
      const year = (item.release_date || item.first_air_date || '').split('-')[0] || 'N/A';
      const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
      return `
        <div class="bg-gray-800 rounded-xl shadow-md hover:scale-105 transition p-3">
          <img src="${poster}" class="rounded-lg mb-3 w-full h-72 object-cover">
          <h3 class="text-lg font-semibold">${title}</h3>
          <p class="text-gray-400 text-sm">${year} | ⭐ ${rating}</p>
          <button onclick="showDetails(${item.id}, '${item.media_type}')" class="mt-3 bg-yellow-400 text-gray-900 w-full py-1 rounded-lg font-semibold hover:bg-yellow-300">View Details</button>
        </div>
      `;
    }).join('');
  }
});
