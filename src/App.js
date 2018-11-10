import React, { Component } from 'react';
import Venue from './component/Venue';
import './App.css';
import axios from 'axios';

class App extends Component {
/*A state is created with the 'search' meant to record the user's input.
The 3 arrays will have the 6 locations stored within them in order to be accessed.*/
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      venues: [],
      places: [],
      markers: []
    }
  };

/*The componentDidMount() is called giving API requests from this.getVeneus in order to display locations.
The 'window.gm_authFailure will notify the user if there is a an error when loading the map.'*/
  componentDidMount() {
    this.getVenues()
    window.gm_authFailure = () => {
         alert('Failed to load map.')
      }
  }

/*The 'getVeneus' uses client_id and a client_secret as to allow access to the API. The 'query' sets the category of
'attractions' that are known locally to the city, along with the 'limit' that sets the number of attractions.
.then() is used to return a promise that updates the state's venues and places with the API and a .catch() is used if there is a error within that promise.*/
  getVenues = () => {
  axios.get('https://api.foursquare.com/v2/venues/explore?' + new URLSearchParams({
    client_id: 'Y4HOWLASE0FWJ23LPMWLWMINXCXXGS0F4HEN0RDJSVP1U40U',
    client_secret: 'WOWYTORM2EP1JLDIO03SB1KMMYXO4BABEIMTSFBA55PJPCZT',
    query: 'attractions',
    url: 'https://foursquare.com/explore?mode=url&near=Tucson%2C%20AZ&nearGeoId=72057594043246249&q=attractions',
    limit: 6,
    near: 'Tucson',
    v: '20182210'
  })
).then(response => {
    this.setState({
      venues: response.data.response.groups[0].items,
      places: response.data.response.groups[0].items
    },this.map()
  )
}).catch(error => {
    alert(error)
  })
}

/*The google API is used in the loadscript in order to render the map to the user. The display function will
also render with the purpose of diplaying the markers with the appropriate information.*/
map = () => {
  loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAQkHIBWjyRGJy2EsEu8DZ0jPBBvWC1b9s&callback=display")
  window.display = this.display
}

/*The display is creates the markers and renders them in the map*/
//https://developers.google.com/maps/documentation/javascript/markers
display = () => {

/*The map variable is created by establishing the lat and lng along with centering the appropriate zoom.
The variable is then later used in creating multiple markers.*/
  let map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.2226, lng: -110.9747},
    zoom: 10
  })

  let infowindow = new window.google.maps.InfoWindow()
  let allMarkers = [];

/*The marker is established with the position taking in lat and lng from the venue's API.
The same strategy is executed in taking in the name and address of the API and placing it in the marker.
An addListener is implemented when clicked to display the limited animation along with the marker's name and address.
The marker will then be inserted into the 'allMarkers' array and updated in the state's 'markers' array
as well as the venue being returned.*/
      this.state.venues.map(venue => {
        var address = `${venue.venue.location.address  + '<br> <a href = "https://foursquare.com/explore?mode=url&near=Tucson%2C%20AZ&nearGeoId=72057594043246249&q=attractions">Provided by FOURSQUARE'}`
        var contentString = `${venue.venue.name}`
        var marker = new window.google.maps.Marker({
          position: {lat: venue.venue.location.lat , lng: venue.venue.location.lng},
          map: map,
          title: contentString,
          animation: window.google.maps.Animation.DROP,
          icon: {
            path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            strokeColor: 'blue',
            scale: 5
          }
        });

        marker.addListener('click', () => {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          window.setTimeout(marker.setAnimation(false), 500);
          infowindow.setContent('<b>' + contentString + '</b> <br>'  + address);
          infowindow.open(map, marker);
        });

        allMarkers[allMarkers.length] = marker;
        return venue;
      });

      this.setState({
        markers: allMarkers
      });
}

/*The filterVenues is used to filter the venue list when the user types in the search bar.
The .startsWith() is used to compare the first letter the user types in to match the venue's name.
The venue's name will then be matched with the marker on the map. Then the venue will be inserted in the 'places' array.
This gives it the ability to be updated in the state thus displying it to the user.
For any venues that do not match the user's input will make the venue list and markers on the map disapear.*/

//filterVenues function was partially assisted from Jason Michael White [FEND] Project Coach and
//influenced by https://www.youtube.com/watch?v=5J6fs_BlVC0&t=3539s
filterVenues = search => {
  const access = this.state;
  const places = [];

  access.venues.map(venue => {
    if (venue.venue.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())) {

      access.markers.filter(marker => {
        if (marker.title !== venue.venue.name) {
          marker.setVisible(false);
        } else if
            (marker.title === venue.venue.name) {
              marker.setVisible(true);
              places[places.length] = venue;
        }
        return marker
      });
      this.setState({
        search, places
      });
    }

/*When the search bar is empty the state's venues is updated making the listed venues appear to the user.
The markers will reappear to the user through the use of '.some()'.*/
    if (search === "") {
      this.setState({
        places: access.venues
      });
      access.markers.some(marker => {
        return marker.setVisible(true);
      });
    }
    return venue;
  });
};

/*The handleClick function will will use 'window.google.maps.event' that will match the listed venue's name with the marker's title.
The user clicks on the venue in order to activate the marker's infoWindow on the map.*/
//https://developers.google.com/maps/documentation/javascript/events
handleClick = (venue) => {
  let access = window.google.maps.event;

//The .find() was suggested by Forrest Walker from FEND-proj-7
  let marked = this.state.markers.find(marker => marker.title === venue.name);
  access.trigger(marked, 'click');
    }

     render() {

/*The 'set' variable defines the input method which will allow the user to type the location in the search field.
The 'onChange' targets the 'filterVenues' and allows user to input and filter the results*/
      let set;
       set = <div className="search-area" id="search-box">
            <input
              type='text'
              id="search"
              name="search"
              size="20"
              className="input"
              placeholder={"Search Local Attractions..."}
              onChange={(e) => {
                             this.filterVenues(e.target.value);
                           }}
             />
              <Venue
              press={this.handleClick}
                    {...this.state}
               />
          </div>

       return (
         <div>
           <div id="map" />
               <header className="app-header">
                  <h1 className="app-title">Old Pueblo Guide</h1>
               </header>
            {set}
           </div>
    )
  }
}

/*The function creates the loadScript(url) which will allow the API key to be rendered within the map*/
//https://www.youtube.com/watch?v=W5LhLZqj76s&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1
function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
