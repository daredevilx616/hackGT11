document.addEventListener('DOMContentLoaded', () => {
  // Get the API key from the data attribute
  const maps_api_key = document.getElementById('api-data').dataset.apiKey;

  // You can now use the `apiKey` variable in your external JavaScript logic

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",
    q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new 
    Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));
    e.set("libraries",[...r, ]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);
    e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;
    a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));
    d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
({key: maps_api_key, v: "weekly"});
//authentification


let map;

// This example adds hide() and show() methods to a custom overlay's prototype.
// These methods toggle the visibility of the container <div>.
// overlay to or from the map.
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const {ColorScheme} = await google.maps.importLibrary("core")
    map = new Map(document.getElementById("map"), {
        mapId: '9fa8c50ef8e0cdcd',
        colorScheme:ColorScheme.DARK,
        //mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: { lat: 37.0902, lng: -95.7129 }, // Center of the US
        zoom: 4, // Adjust initial zoom level
        //can set minzoom and
        restriction: {
          latLngBounds: {
            north: 49.38,  // Northern boundary of the US
            south: 24.396308, // Southern boundary of the US
            west: -125.0, // Western boundary of the US
            east: -66.93457 // Eastern boundary of the US
          },
          strictBounds: true, // Prevents panning outside the defined boundaries
        },
      });

    // The photograph is courtesy of the U.S. Geological Survey.


  }
async function awaitingMap(){
await initMap();

//initializing the map
class USGSOverlay extends google.maps.OverlayView {
  div;
  bounds;
  price;
  constructor(boundsArray, price) {
    super();
    const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(boundsArray[0],boundsArray[1]),
        new google.maps.LatLng(boundsArray[0],boundsArray[1]),
      );
    this.bounds = bounds;
    this.price = price;
  }

  onAdd() {
    this.div = document.createElement("div");
    this.div.style.borderStyle = "none";
    this.div.style.borderWidth = "0px";
    this.div.style.position = "absolute";
    const hospital_icon = document.createElement('img');
        // Set the source of the img to the PNG file path (relative or absolute)
    hospital_icon.src = 'hospital-location.png'; // Replace with the actual path
    //this.div.appendChild(hospital_icon);

    const paragraph=document.createElement('p');
    paragraph.style.fontSize='16px'
    paragraph.innerText=this.price;
    paragraph.className='price_marker';
    switch (true) {
      case this.price < 5000:
        console.log(`switch statement executing with ${this.price}`);
        paragraph.style.backgroundColor = '#BFE6FF';
        paragraph.style.border = '1px solid #BFE6FF';
        break;
    
      case this.price < 10000:
        console.log(`switch statement executing with ${this.price}`);
        paragraph.style.backgroundColor = '#8CD3FF';
        paragraph.style.border = '1px solid #8CD3FF';
        break;
    
      default:
        console.log(`switch statement executing with ${this.price}`);
        paragraph.style.backgroundColor = '#59BFFF';
        paragraph.style.border = '1px solid #59BFFF';
        break;
    }
    
    this.div.appendChild(paragraph);

    // Add the element to the "overlayLayer" pane.
    const panes = this.getPanes();

    panes.markerLayer.appendChild(this.div);
  }
  draw() {
    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    const overlayProjection = this.getProjection();
    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    const sw = overlayProjection.fromLatLngToDivPixel(
      this.bounds.getSouthWest(),
    );
    const ne = overlayProjection.fromLatLngToDivPixel(
      this.bounds.getNorthEast(),
    );

    // Resize the image's div to fit the indicated dimensions.
    if (this.div) {
      this.div.style.left = sw.x + "px";
      this.div.style.top = ne.y + "px";
      this.div.style.width = ne.x - sw.x + "px";
      this.div.style.height = sw.y - ne.y + "px";
    }
  }
  /**
   * The onRemove() method will be called automatically from the API if
   * we ever set the overlay's map property to 'null'.
   */
  onRemove() {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      delete this.div;
    }
  }
  /**
   *  Set the visibility to 'hidden' or 'visible'.
   */
  hide() {
    if (this.div) {
      this.div.style.visibility = "hidden";
    }
  }
  show() {
    if (this.div) {
      this.div.style.visibility = "visible";
    }
  }
  toggle() {
    if (this.div) {
      if (this.div.style.visibility === "hidden") {
        this.show();
      } else {
        this.hide();
      }
    }
  }
  toggleDOM(map) {
    if (this.getMap()) {
      this.setMap(null);
    } else {
      this.setMap(map);
    }
  }
}

const overlay = new USGSOverlay( [41.805548,-87.921358], '11000');

overlay.setMap(map);

const toggleButton = document.createElement("button");

toggleButton.textContent = "Toggle";
toggleButton.style.display='none';
toggleButton.classList.add("custom-map-control-button");

const toggleDOMButton = document.createElement("button");

toggleDOMButton.textContent = "Toggle DOM Attachment";
toggleDOMButton.style.display='none';
toggleDOMButton.classList.add("custom-map-control-button");
toggleButton.addEventListener("click", () => {
  overlay.toggle();
});
toggleDOMButton.addEventListener("click", () => {
  overlay.toggleDOM(map);
});
map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleDOMButton);
map.controls[google.maps.ControlPosition.TOP_RIGHT].push(toggleButton);
let autocomplete;
async function initAutocomplete() {
  // Initialize the autocomplete object for the input field
  const {Autocomplete} = await google.maps.importLibrary("places")
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('places_search_bar'),
    {
      componentRestrictions: { country: ['us'] }, // Restrict search to the US
      fields: ['formatted_address', 'address_components', 'geometry'], 
    }
  );
  autocomplete?.addListener('place_changed', onPlaceChanged);
}
initAutocomplete();
//autocomplete functionality

//function for when user clicks one of the suggested places, zooms in on the city
let city = '';
function onPlaceChanged(){
    const place=autocomplete.getPlace();
    console.log('here is the formatted address',place.address_components);
    const regex = /^[^,]*,([^,]*),/;
    
      place.address_components.forEach(component => {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
      });

      if (city) {
        // Zoom in on the selected city using Geocoding API
        geocodeCityAndZoom(city);
      } else {
        console.log("City not found in address components.");
      }
    }
    console.log('here is city global scope', city);
    // Function to geocode the city and zoom in
    async function geocodeCityAndZoom(city) {
      const condition=document.getElementById('conditions_search_bar').value;
      const request=new Request("conditionEntered", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: city, condition: condition })
    });
      let conditionCityResponse=await fetch(request);
      let json_response=await conditionCityResponse.json();
      json_response.forEach(tuple => {
        const [lat_long, condition] = tuple;  // Destructure the tuple
        const overlay = new USGSOverlay( lat_long, condition);

        overlay.setMap(map);
        console.log(`lat_long ${lat_long} condition ${condition}`);
      });
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: city }, (results, status) => {
        if (status === "OK") {
          // Get the city location (latitude and longitude)
          const location = results[0].geometry.location;

          // Center the map on the city and zoom in
          map.setCenter(location);
          map.setZoom(12); // Adjust the zoom level based on your needs
          console.log(`Zooming in on: ${city}`);
        } else {
          console.log(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    }

    // Initialize the autocomplete and map
    initAutocomplete();
  }
awaitingMap();

function getSuggestions() {
    console.log('getSuggestions called');
    let query = document.getElementById('conditions_search_bar').value;
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
});