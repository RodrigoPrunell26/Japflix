document.addEventListener("DOMContentLoaded", function () {
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const lista = document.getElementById("lista");
    const detallePelicula = document.getElementById("detalle-pelicula");
    const detalleTitulo = document.getElementById("detalle-titulo");
    const detalleTagline = document.getElementById("detalle-tagline");
    const detalleVote = document.getElementById("detalle-vote");
  
    let selectedMovie;

    function loadData() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://japceibal.github.io/japflix_api/movies-data.json", true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          const searchTerm = inputBuscar.value.toLowerCase().trim();
          const filteredData = data.filter((movie) => {
            const titleMatch = movie.title.toLowerCase().includes(searchTerm);
            const taglineMatch = movie.tagline.toLowerCase().includes(searchTerm);
            const genresMatch = movie.genres.some((genreObj) => genreObj.name.toLowerCase().includes(searchTerm));
            const overviewMatch = movie.overview.toLowerCase().includes(searchTerm);
            return titleMatch || taglineMatch || genresMatch || overviewMatch;
          });
          displayResults(filteredData);
        }
      };
      xhr.send();
    }
    function fillAdditionalInfo(movie) {
      const anoLanzamiento = document.getElementById("ano-lanzamiento");
      const duracionLargometraje = document.getElementById("duracion-largometraje");
      const presupuesto = document.getElementById("presupuesto");
      const ganancias = document.getElementById("ganancias");
  
      anoLanzamiento.textContent = movie.release_date.split("-")[0];
      duracionLargometraje.textContent = movie.runtime + " min";
      presupuesto.textContent = "$" + movie.budget;
      ganancias.textContent = "$" + movie.revenue;
    }

    function displayResults(data) {
      lista.innerHTML = "";
      detallePelicula.style.display = "none";
  
      if (data.length === 0) {
        lista.innerHTML = "No se encontraron resultados.";
        return;
      }
  
      data.forEach((movie) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.style.cursor = "pointer";
  
        const titleElement = document.createElement("h3");
        titleElement.textContent = movie.title;
        listItem.appendChild(titleElement);
  
        const taglineElement = document.createElement("p");
        taglineElement.textContent = movie.tagline;
        listItem.appendChild(taglineElement);
  
        const voteAverage = parseFloat(movie.vote_average);
        const stars = "★".repeat(Math.round(voteAverage / 2));
        const voteAverageElement = document.createElement("p");
        voteAverageElement.textContent = `Vote Average: ${stars} (${voteAverage})`;
        listItem.appendChild(voteAverageElement);
  
        listItem.addEventListener("click", () => {
          showMovieDetails(movie);
        });
  
        lista.appendChild(listItem);
      });
    }
  
    // Función para mostrar detalles de la película seleccionada
    function showMovieDetails(movie) {
      selectedMovie = movie;
      detalleTitulo.textContent = "Título: " + movie.title;
      detalleTagline.textContent = "Resumen: " + movie.overview;
  
      const genres = movie.genres.map((genreObj) => genreObj.name).join(", ");
      detalleVote.textContent = "Géneros: " + genres;
  
      detallePelicula.style.display = "block";
  
      fillAdditionalInfo(movie);
    }
  
    btnBuscar.addEventListener("click", function () {
      if (inputBuscar.value.trim() !== "") {
        loadData();
      }
    });
  
    const mostrarInfoButton = document.getElementById("mostrar-info");
    const infoDesplegable = document.getElementById("info-desplegable");
  
    mostrarInfoButton.addEventListener("click", () => {
        if (infoDesplegable.style.display === 'none') {
          infoDesplegable.style.display = 'block';
        } else {
          infoDesplegable.style.display = 'none';
        } })
      });

  
  
  










