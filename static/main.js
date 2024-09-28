//displaying the default map with search bars 
import { Loader } from "@googlemaps/js-api-loader"
const loader = new Loader({
    apiKey: "AIzaSyBFSI3KSENh6j91K2JLhFMPy4uN6MQGT74",
    version: "weekly",
    ...additionalOptions,
  });
  
  loader
  .importLibrary('maps')
  .then(({Map}) => {
    new Map(document.getElementById("map"), mapOptions);
  })
  .catch((e) => {
    // do something
});

function getSuggestions() {
    let query = document.getElementById('searchBar').value;
    if (query.length === 0) {
        document.getElementById('suggestions').style.display = 'none';
        return;
    }

    fetch(`http://127.0.0.1:5000/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const suggestionsDiv = document.getElementById('suggestions');
            suggestionsDiv.innerHTML = '';
            if (data.length > 0) {
                suggestionsDiv.style.display = 'block';
                data.forEach(item => {
                    let suggestionElement = document.createElement('div');
                    suggestionElement.className = 'suggestion';
                    suggestionElement.innerText = item.name + ': ' + item.data;
                    suggestionsDiv.appendChild(suggestionElement);
                });
            } else {
                suggestionsDiv.style.display = 'none';
            }
        });
}
