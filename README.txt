* * * Final project for CSCIE-3 
      Instructor: Larry Bouthillier
      Author: Irina Lobova
      Interactive neighborhood map 

The app is created as the interactive map that helps to find the places to dine out based on the location and
type of food you entered. 

The initial map location is set to Cambridge, MA (my neighborhood). The markers show Thai cuisine places. The list on the right contains all markers shown at the moment.

How to run the app: 
Simply open index.html file in your browser and enjoy the app! 

How to use the app:
You enter your neighborhood name (as well as your address or city name) to the input box labeled ‘I live in’. Then enter what type of food you are going to eat in the input box labeled ‘I want to eat’ and click submit button. The map, markers and the list will be updated according to the information you entered. If you click a marker on the map, it will open the info-window for the clicked marker. If you click on the place name in the list, the map will zoom it in, and the marker will begin to bounce. 
The list is displayed on the right on large and medium screens, and under the map on mobile and portrait tablet screens. The search panel view will also change according to the device you use. 

Sourced I used: 
- knockoutjs.com (docs and tutorials);  
- pluralsight.com/courses/knockout-mvvm, author: John Papa;
- developers.google.com/maps/documentation/javascript;
- foundation.zurb.com.

Implemented requirements:
1. DOM element creation, deletion or modification (lines 24-27 in index.html: ul is  populated with new li depending 
   on the information a user enters, the list is located on the right in the browser and in the bottom if the app is
   opened on mobile or portrait tablet);
2. Capturing and handling events (when a user enters new information into the input fields and clicks submit,
   when a user clicks a marker on the map(get info-window), when a user clicks a venue name in the list (map focus and
   bouncing));
3. Creating and handling a data structure (the list of venues is the JSON object that is created from the data we 
   get from Google Map and Foursquare APIs). Also the responses we get from the AJAX requests are both JSON formatted. 
4. AJAX: based on Google and Foursquare APIs.
