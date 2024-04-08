let searchButton = document.getElementById('search-button');
let searchField = document.getElementById('search-field');
let selectField = document.getElementById('search-select');
let searchYear = document.getElementById('search-year');

let ApiLink = "https://www.omdbapi.com/?apikey=1f582b98&t=";
let apiLink = ApiLink;
let movieTitle = document.getElementById('movie-title');
let movieDuration = document.getElementById('movie-duration');
let movieRatings = document.getElementById('movie-ratings');
let movieGenre = document.getElementById('movie-genre');
let movieCollection = document.getElementById('movie-collections');
let moviePoster = document.getElementById('movie-image');
let movieType = document.getElementById('movie-type');
let movieDate = document.getElementById('movie-year');


searchButton.addEventListener('click', searchButtonClicked);

function searchButtonClicked(event) {
    event.preventDefault();
    apiLink = ApiLink;  
    apiLink += searchField.value.toLowerCase();
    if (selectField.value != "null") {
        apiLink = apiLink + "&type=" + selectField.value;
    }
    
    if (searchYear.value != "") {
        apiLink = apiLink + "&y=" + searchYear.value;
    }

    console.log(apiLink);
    fetch(apiLink)
        .then(res => res.json()) 
        .then(json => {
            let d = new Date(Date.now());
            let year = d.getFullYear();
            let date = d.getDate();

            let completeDate = date + " Apr " + year;
            if (json.Response === "True") {
                resultDone(json.Title, json.Released, json.Runtime, json.imdbRating, json.Genre, json.BoxOffice, json.Poster, json.Type);
            }
            else {
                resultDone("Movie not found", completeDate, "0 min", "10", "Imagination", "$0", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0GzvHo1OUdRTe60S4uKkKukJ5neoRo9_qlZ8JBeS1jg&s", "None");
            }
        })
}

function resultDone(title, date, runtime, imdbrating, genre, boxoffice, poster, type) {
    movieTitle.textContent = title;
    movieDate.textContent = date;
    movieDuration.textContent = runtime;
    movieRatings.textContent = imdbrating;
    movieGenre.textContent = genre;
    movieCollection = boxoffice;
    moviePoster.setAttribute('src', poster);
    movieType.textContent = type.slice(0, 1).toUpperCase() + type.slice(1);
}