document.addEventListener('DOMContentLoaded', function() {
    const postMovieForm = document.getElementById('postMovieForm');
    const putMovieForm = document.getElementById('putMovieForm');
    const deleteMovieForm = document.getElementById('deleteMovieForm');
    const resultContent = document.getElementById('resultContent');

    function displayResult(message, data = null, success = true) {
        let resultHTML = `<p>${message}</p>`;
        if (data) {
            resultHTML += `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }
        resultContent.innerHTML = resultHTML;
        resultContent.style.color = success ? 'green' : 'red';
    }

    postMovieForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = {
            imdbID: document.getElementById('postImdbID').value,
            Title: document.getElementById('Title').value,
            Year: document.getElementById('Year').value,
            Type: document.getElementById('Type').value,
            Poster: document.getElementById('Poster').value,
            description: document.getElementById('Description').value,
            Ubication: document.getElementById('Ubication').value,
            Estado: parseInt(document.getElementById('Estado').value)  // Asegúrate de convertir el valor a número
        };

        fetch('https://movie.azurewebsites.net/api/cartelera', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            displayResult(`Película añadida exitosamente:`, data, true);
        })
        .catch(error => {
            displayResult(`Error al añadir la película: ${error}`, null, false);
        });
    });

    putMovieForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const imdbID = document.getElementById('putImdbID').value;
        const data = {
            Title: document.getElementById('putTitle').value
        };

        fetch(`https://movie.azurewebsites.net/api/cartelera?imdbID=${imdbID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            displayResult(`Película actualizada exitosamente:`, data, true);
        })
        .catch(error => {
            displayResult(`Error al actualizar la película: ${error}`, null, false);
        });
    });

    deleteMovieForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const imdbID = document.getElementById('deleteImdbID').value;

        fetch(`https://movie.azurewebsites.net/api/cartelera?imdbID=${imdbID}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                displayResult(`Película con ID ${imdbID} eliminada exitosamente.`, null, true);
            } else {
                throw new Error('Error al eliminar la película');
            }
        })
        .catch(error => {
            displayResult(`Error al eliminar la película: ${error}`, null, false);
        });
    });
});
