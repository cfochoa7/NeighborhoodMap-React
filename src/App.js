import React, { Component } from 'react';
import VenueList from './component/VenueList';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      venues: [],
      searchedLocations: [],
      markers: []
    }
  };

  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAQkHIBWjyRGJy2EsEu8DZ0jPBBvWC1b9s&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: 'Y4HOWLASE0FWJ23LPMWLWMINXCXXGS0F4HEN0RDJSVP1U40U',
      client_secret: 'WOWYTORM2EP1JLDIO03SB1KMMYXO4BABEIMTSFBA55PJPCZT',
      query: 'attractions',
      limit: 5,
      near: 'Tucson',
      v: '20182210'
    }

  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
    this.setState({
      venues: response.data.response.groups[0].items,
      searchedLocations: response.data.response.groups[0].items
    },this.renderMap())
  })
  .catch(error => {
    console.log(error)
  })
}


initMap = () => {

  let map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.2226, lng: -110.9747},
    zoom: 10
  })

  let infowindow = new window.google.maps.InfoWindow()
  let allMarkers = [];

      this.state.venues.map(venue => {
        var address = `${venue.venue.location.address  + '<br> <a href = "https://foursquare.com/">Provided by FOURSQUARE'}`
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

        marker.addListener('click', function() {
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


filterVenues = search => {
  const access = this.state;
  const searchedLocations = [];

  access.venues.map(venue => {
    if (venue.venue.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())) {
      access.markers.map(marker => {

        if (marker.title === venue.venue.name && true) {
          marker.setVisible(true);
          searchedLocations[searchedLocations.length] = venue;

        } else {
          marker.setVisible(false);
        }
        return marker;
      });

      this.setState({
        search, searchedLocations
      });
    }

    if (search === "") {
      this.setState({
        searchedLocations: access.venues
      });
      access.markers.forEach(marker => {
        marker.setVisible(true);
      });
    }

    return venue;
  });
};

handleClick = (venue) => {
  let access = window.google.maps.event;
  let marked = this.state.markers.find(marker => marker.title === venue.name);
  access.trigger(marked, 'click');
    }

     render() {
       return (
         <div>
           <div id="map" />
               <header className="app-header">
                  <h1 className="app-title">Old Pueblo Guide</h1>
               </header>

               <div className="search-area" id="search-box">

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
           </div>
       )
     }
   }


function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
