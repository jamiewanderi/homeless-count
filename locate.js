var map;
var marker;
var pos;
function initialize() {
  var mapOptions = {
    zoom: 18
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    handleNoGeolocation(false);
  }
    var markers = [];
var input = (document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

var searchBox = new google.maps.places.SearchBox((input));
    google.maps.event.addListener(searchBox, 'places_changed', function() {
var places = searchBox.getPlaces();

if (places.length == 0) {
    return;
}
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }
    var bounds = new google.maps.LatLngBounds();
    
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
  var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
 
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

var teamLayer = new google.maps.KmlLayer({
  url: 'http://zrobinson.bol.ucla.edu/google/pico1.kml?time'+ new Date().getTime()
});
teamLayer.setMap(map);

};

function addMarker() {
	var marker = new google.maps.Marker({
		position: map.getCenter(),
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP,
	});
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Geolocation failed.<br>Use the search box to find your location.';
  } else {
    var content = 'Geolocation failed.<br>Use the search box to find your location.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(34.0219, -118.4814),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);