const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
//google maps api marker element libraries 
// Create a pin element.
const pin = new PinElement({
    scale: 1.5,
});
// Create a marker and apply the element.
const marker = new AdvancedMarkerElement({
    map,
    position: { lat: 37.419, lng: -122.02 },
    content: pin.element,
});
//modify it to forLoop to make multiple markers, pass the geotags to it
// Return an array of markers.
const advancedMarkers = [...document.querySelectorAll('gmp-advanced-marker')];

// Loop through the markers
for (let i = 0; i < advancedMarkers.length; i++) {
  const pin = new PinElement({
      scale: 2.0,
  });

  marker.appendChild(pin.element);
}