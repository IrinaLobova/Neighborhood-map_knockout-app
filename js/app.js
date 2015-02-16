//Google Maps
var q = {lat: 42.3744, lng: -71.1169, food: 'pizza'};

function initialize() {

  var myLatlng = new google.maps.LatLng(q.lat, q.lng);
  var mapOptions = {
      center: { lat: q.lat, lng: q.lng},
      zoom: 13
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

//Takes lng and lat from LongLatArray and applies them to set markers on the map
  for (var index in LongLatArray) {
    var element = LongLatArray[index];
    var elementName = VenuesArray[index];
    var newLatlng = new google.maps.LatLng(element.lat, element.lng);
  	var marker = new google.maps.Marker({
  		position: newLatlng,
  		map: map,
      animation: google.maps.Animation.DROP, //adds drop animations to the markers
	    content: elementName
    });
    
    //create infowindows for each of the markers
    var infowindow = new google.maps.InfoWindow();
    
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, this);
      infowindow.setContent(this.content);    
    });

  } //end for loop
} //end initialize

var LongLatArray = []; //Array of venues' longitudes and latitudes 
var VenuesArray = []; //Array of venues' names

function ViewModel() {
  var self = this;
  self.AllLocations = ko.observableArray([]);
  //Foursquare API request
  var foursquareUrl = 'https://api.foursquare.com/v2/venues/search' +
  '?client_id=NEVWWB4QNWYIBNRSMMAMPSED3BZTNS3CSTSCHD1LLRR01A2U' +
  '&client_secret=DZZOB2RCPHICI3YUWZDVW2BPCY3B5AXJMOLPEDY4WZPAPPAL' +
  '&ll=' + q.lat +',' + q.lng +
  '&query='+ q.food +
  '&v=20140806' +
  '&m=foursquare';
  
  $.getJSON(foursquareUrl, function(data) {
    console.log(data);
    // Once we get the JSON data, put data into an observable array.
    for (var index in data.response.venues) { 
      var item = data.response.venues[index];
      self.AllLocations.push(item);
      LongLatArray.push({lat: item.location.lat, lng: item.location.lng});//put data to LongLatArray 
      VenuesArray.push(item.name); //put data to VenuesArray
    } //end for loop
    initialize(); // loads google map only after AllLocations and LongLatArray are loaded 
  }); //end of anonymous function


} //end of ViewModel
document.addEventListener('ready', main());

function main () {
  ko.applyBindings(new ViewModel());
};














