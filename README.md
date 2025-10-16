🎬 Movie/TV Show Finder App
A simple and visually appealing web application to search movies and TV shows, view details, and save favorites. Built with HTML, Tailwind CSS, JavaScript, and the TMDB API.
🗂️ Project Structure
movie-finder/
│
├── index.html        # Main HTML page with search and results
├── style.css         # Optional custom CSS (Tailwind handles most styling)
├── app.js            # JavaScript logic: fetches TMDB API, handles modal & favorites
├── README.md         # Project documentation (this file)
⚡ Features
Search for movies or TV shows using TMDB API
Display poster, title, year, rating for each result
Click View Details to see a modal with:
Poster
Full title
Genres
Rating
Overview/plot
Save favorites to localStorage
View trending movies/TV shows on page load
Styled with Tailwind CSS for a clean and responsive design
🛠️ Setup Instructions
Clone or download this repository:
git clone <your-repo-url>
cd movie-finder
Open index.html in your browser (no server needed).
Get a free TMDB API Key:
Sign up: https://developer.themoviedb.org
Go to Settings → API → Create API Key
Use any Application URL (like http://localhost)
Copy the key and paste it in app.js:
const API_KEY = 'YOUR_TMDB_API_KEY';
Save and refresh your browser — the app is ready to use!
📁 File Descriptions
index.html
Main page with search bar, results grid, and modal for detailed view.
style.css
Optional CSS file for minor custom styling (scrollbars, etc.). Tailwind handles most styling.
app.js
Handles:
Fetching search results from TMDB API
Rendering results dynamically
Opening modal with detailed info
Saving favorites to localStorage
Loading trending movies/TV shows on page load
💡 Optional Improvements
Add a separate Favorites Page to view and remove saved favorites
Implement dark/light mode toggle
Add pagination for search results
Include trailers or YouTube embeds using TMDB video endpoint
Deploy to Netlify or Vercel for live access
🏆 Technologies Used
HTML5
Tailwind CSS (CDN)
JavaScript (ES6+)
TMDB API
