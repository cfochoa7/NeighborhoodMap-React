import React, { Component } from 'react';
import VenueList from './component/VenueList';
import './App.css';
import axios from 'axios';

class App extends Component {
/*A state is created with the 'search' meant to record the user's input.
The 3 arrays have the 5 locations stored within them and will accessed */
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      venues: [],
      places: [],
      markers: []
    }
  };

  /*The componentDidMount() is called giving API requests from foursquare in order to display locations*/
  componentDidMount() {
    this.getVenues()
  }

/*The 'getVeneus' uses client_id and a client_secret as to allow access to the API. The 'query' sets the category of
'attractions' that are known locally to the city, along with the 'limit' that sets the number of attractions.
.then() is used to return a promise that updates the state's venues and places witht the API and a .catch() is used if there is a error within that promise.*/
  getVenues = () => {
//https://www.npmjs.com/package/axios
//https://developer.foursquare.com/docs/api/venues/search
  axios.get('https://api.foursquare.com/v2/venues/explore?' + new URLSearchParams({
    client_id: '#',
    client_secret: '#',
    query: 'attractions',
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
  loadScript("https://maps.googleapis.com/maps/api/js?key&callback=display")
  window.display = this.display
}

/*The display is creates the markers and renders them in the map*/
display = () => {

  /*The map variable is created by establishing the lat and lng along with centering the appropriate zoom.
  The variable is then later used in creating multiple markers.*/
  //https://developers.google.com/maps/documentation/javascript/markers
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
        var address = `${venue.venue.location.address  + '<br> <a href = "https://developer.foursquare.com/">Provided by FOURSQUARE'}`
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

/**/
filterVenues = search => {
  const access = this.state;
  const places = [];

  access.venues.map(venue => {
    if (venue.venue.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())) {

//
      access.markers.filter(marker => {
        if (marker.title === venue.venue.name && true) {
          marker.setVisible(true);
          places[places.length] = venue;
        } else {
          marker.setVisible(false);
        }
        return marker
      });

      this.setState({
        search, places
      });
    }

/**/
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

/**/
//https://developers.google.com/maps/documentation/javascript/events
handleClick = (venue) => {
  let access = window.google.maps.event;
  let marked = this.state.markers.find(marker => marker.title === venue.name);
  access.trigger(marked, 'click');
    }

     render() {

/*The 'set' variable deifines the input method which will allow the user to type the location in the search field.
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
              <VenueList
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

/**/
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
