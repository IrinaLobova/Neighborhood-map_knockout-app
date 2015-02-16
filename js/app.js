//Google Maps
var q = {lat: 42.3744, lng: -71.1169, food: 'pizza'};
var geocoder;
var map;
var AllLocations = ko.observableArray([]);
var markers = [];

function main () {
  initialize();// loads google map only after AllLocations and dataArray are loaded
  ko.applyBindings(new ViewModel());
};

function initialize() {

  geocoder = new google.maps.Geocoder();
  var myLatlng = new google.maps.LatLng(q.lat, q.lng);
  var mapOptions = {
      center: {lat: q.lat, lng: q.lng},
      zoom: 13
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
} 

// Takes address (value from the input box), converts it to new lat and lng and updates the map.
// Then calls ViewModel to update markers
function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var newLatlng  = new google.maps.LatLng(results[0].geometry.location);
      map.setCenter(results[0].geometry.location);
      q.lat = results[0].geometry.location.k;
      q.lng = results[0].geometry.location.D;
      q.food = document.getElementById('food').value;
      console.log(results[0].geometry.location);
      clearMarkers(); //clear previous markers
      ViewModel();
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
 
function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
} 

function ViewModel() {
  AllLocations.removeAll(); //removes previous items from the list
  
  //Foursquare API request
  var foursquareUrl = 'https://api.foursquare.com/v2/venues/search' +
  '?client_id=NEVWWB4QNWYIBNRSMMAMPSED3BZTNS3CSTSCHD1LLRR01A2U' +
  '&client_secret=DZZOB2RCPHICI3YUWZDVW2BPCY3B5AXJMOLPEDY4WZPAPPAL' +
  '&ll=' + q.lat +',' + q.lng +
  '&query='+ q.food +
  '&v=20140806' +
  '&m=foursquare';
  
  var dataArray = []; //Array of venues' names and longitudes and latitudes 

  $.getJSON(foursquareUrl, function(data) {
    // Once we get the JSON data, put data into an observable array.
    for (var index in data.response.venues) { 
      var item = data.response.venues[index];
      AllLocations.push(item);
      dataArray.push({lat: item.location.lat, lng: item.location.lng, name: item.name});//put data to LongLatArray 
    } //end for loop
    setMarkers(dataArray);
  }); //end of anonymous function
} //end of ViewModel

//Takes lng and lat from dataArray and applies them to set markers on the map
//end initialize
function setMarkers (dataArray) {
  for (var index in dataArray) {
    var element = dataArray[index];
    var newLatlng = new google.maps.LatLng(element.lat, element.lng);
    var marker = new google.maps.Marker({
      position: newLatlng,
      map: map,
      animation: google.maps.Animation.DROP, //adds drop animations to the markers
      content: element.name
    });
    markers.push(marker);
    
    //create infowindows for each of the markers
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, this);
      infowindow.setContent(this.content);    
    }); 
  } //end for loop
}//end setMarkers

document.addEventListener('ready', main());


